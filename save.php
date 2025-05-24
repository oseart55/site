<?php
// Get inputs
$filename = $_POST['filename'] ?? '';
$newfilename = trim($_POST['newfilename'] ?? '');
$location = $_POST['location'] ?? 'documents';

// Sanitize location - allow only a safe directory name (letters, numbers, underscore, dash)
if (!preg_match('/^[a-zA-Z0-9_-]+$/', $location)) {
    $location = 'documents';
}

// Base directory path
$baseDir = realpath(__DIR__ . '/' . $location);
if ($baseDir === false) {
    die('Invalid base directory.');
}

// Determine which filename to use
if (empty($filename) && $newfilename !== '') {
    // Sanitize newfilename to allow only safe chars, prevent traversal
    $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '', $newfilename);
    if ($safeName === '') {
        die('Invalid filename.');
    }
    $filenameToSave = $safeName;
} elseif ($filename !== '') {
    // Sanitize filename coming from select input
    $safeName = preg_replace('/[^a-zA-Z0-9._\/-]/', '', $filename);
    if ($safeName === '') {
        die('Invalid filename.');
    }
    $filenameToSave = $safeName;
} else {
    die('No filename provided.');
}

// Ensure filename ends with .md
if (!str_ends_with($filenameToSave, '.md')) {
    $filenameToSave .= '.md';
}

// Build full path, resolve realpath for safety
$fullPath = realpath($baseDir) . DIRECTORY_SEPARATOR . $filenameToSave;

// Prevent directory traversal: ensure fullPath is inside baseDir
if (strpos(realpath(dirname($fullPath)), $baseDir) !== 0) {
    die('Invalid file path.');
}

// Create directories if not exists (in case filename contains subfolders)
$dir = dirname($fullPath);
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

// Write content
$content = $_POST['content'] ?? '';
file_put_contents($fullPath, $content);

// Redirect back to editor with saved file loaded
header('Location: editor.php?file=' . urlencode($filenameToSave));
exit;
