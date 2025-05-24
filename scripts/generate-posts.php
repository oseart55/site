<?php
$blog_dir = __DIR__ . '/../documents/blogs';
$output_file = __DIR__ . '/../documents/blogs';

$posts = [];

foreach (glob("$blog_dir/*.md") as $file) {
    $content = file_get_contents($file);
    preg_match('/<!--(.*?)-->/s', $content, $metaBlock);
    $meta = ['title' => basename($file), 'date' => 'Unknown', 'tags' => []];

    if (!empty($metaBlock[1])) {
        foreach (explode("\n", trim($metaBlock[1])) as $line) {
            if (strpos($line, ':') !== false) {
                [$key, $value] = explode(':', $line, 2);
                $key = trim(strtolower($key));
                $value = trim($value);

                if ($key === 'tags') {
                    $meta[$key] = array_map('trim', explode(',', $value));
                } else {
                    $meta[$key] = $value;
                }
            }
        }
    }

    $posts[] = [
        'file' => str_replace(__DIR__ . '/../', '', $file),
        'title' => $meta['title'],
        'date' => $meta['date'],
        'tags' => $meta['tags'],
    ];
}

usort($posts, function ($a, $b) {
    return strtotime($b['date']) <=> strtotime($a['date']);
});

file_put_contents($output_file, json_encode($posts, JSON_PRETTY_PRINT));
