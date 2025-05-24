<?php
// Include Parsedown library
include 'Parsedown.php';

$parsedown = new Parsedown();

// Get post slug from URL and sanitize it (only letters, numbers, dash, underscore)
$post = isset($_GET['post']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['post']) : '';

if (!$post) {
    echo "No post specified.";
    exit;
}

$md_file = __DIR__ . "/documents/blogs/{$post}.md";

if (!file_exists($md_file)) {
    echo "Post not found.";
    exit;
}

$md_content = file_get_contents($md_file);
$html = $parsedown->text($md_content);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= htmlspecialchars($post) ?></title>
    <link rel="stylesheet" href="styles/post.css" />
</head>
<body>
    <a href="blog.html" class="download-btn">← Back to blog list</a>
    <article>
        <?= $html ?>
    </article>
</body>
</html>
