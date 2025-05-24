<?php
function listMdFiles($dir, $base = '')
{
  $files = [];
  foreach (scandir($dir) as $entry) {
    if ($entry === '.' || $entry === '..') continue;
    $path = "$dir/$entry";
    $relative = $base ? "$base/$entry" : $entry;
    if (is_dir($path)) {
      $files = array_merge($files, listMdFiles($path, $relative));
    } elseif (str_ends_with($entry, '.md')) {
      $files[] = $relative;
    }
  }
  return $files;
}

$rootDir = __DIR__ . '/documents';
$files = listMdFiles($rootDir);

$currentFile = isset($_GET['file']) ? $_GET['file'] : '';
$filepath = $currentFile ? realpath("$rootDir/$currentFile") : '';
$content = ($filepath && str_starts_with($filepath, realpath($rootDir))) ? file_get_contents($filepath) : '';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Markdown Editor</title>
  <link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
  <link rel="stylesheet" href="./styles/editor.css">
  <link rel="stylesheet" href="./styles/navbar.css">
</head>

<body>
  <div style="width: 100%; position: fixed; top: 0; left: 0; z-index: 1;">
    <header class="navbar">
      <nav class="links" style="display: flex; justify-content: center; gap: 1rem;">
        <a href="./">🏠 Home</a>
        <a href="resume.php">📄 Resume</a>
        <a href="blog.html">📝 Blog</a>
        <a href="projects.html">💻 Projects</a>
      </nav>
    </header>
  </div>

  <h1 style="text-align:center; margin-top: 80px;">Markdown Editor</h1>

  <form action="save.php" method="POST" style="margin: 1rem auto; width: 80%;">
    <!-- Hidden location field to target /documents -->
    <input type="hidden" name="location" value="documents">

    <label for="file">Choose or create a file:</label><br>
    <select id="file" name="filename" onchange="location.href='?file=' + encodeURIComponent(this.value)">
      <option value="">-- New file --</option>
      <?php foreach ($files as $file): ?>
        <option value="<?= htmlspecialchars($file) ?>" <?= $file === $currentFile ? 'selected' : '' ?>>
          <?= htmlspecialchars($file) ?>
        </option>
      <?php endforeach; ?>
    </select>
    <br><br>

    <input type="text" name="newfilename" placeholder="Or type new filename (e.g. new-post.md)">
    <br><br>

    <textarea id="editor" name="content"><?= htmlspecialchars($content) ?></textarea>
    <br>
    <button type="submit">💾 Save</button>
  </form>

  <script src="https://unpkg.com/easymde/dist/easymde.min.js"></script>
  <script>
    const easyMDE = new EasyMDE({ element: document.getElementById('editor') });
  </script>
</body>
</html>
