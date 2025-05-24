<?php
header("Content-Type: application/rss+xml; charset=UTF-8");
require_once "Parsedown.php";

$Parsedown = new Parsedown();
$blogDir = __DIR__ . '/documents/blogs';
$files = glob("$blogDir/*.md");

echo '<?xml version="1.0" encoding="UTF-8" ?>' . "\n";
?>
<rss version="2.0">
  <channel>
    <title>Your Blog Title</title>
    <link>https://yourdomain.com/</link>
    <description>Your blog description goes here.</description>
    <language>en-us</language>
    <lastBuildDate><?= date(DATE_RSS) ?></lastBuildDate>

    <?php
    foreach ($files as $file) {
        $content = file_get_contents($file);

        // Extract front matter
        if (preg_match('/---\s*(.*?)---/s', $content, $matches)) {
            $metaRaw = trim($matches[1]);
            $metaLines = explode("\n", $metaRaw);
            $meta = [];
            foreach ($metaLines as $line) {
                [$key, $val] = explode(':', $line, 2);
                $meta[trim($key)] = trim($val);
            }

            $body = trim(str_replace($matches[0], '', $content));
            $description = $meta['description'] ?? substr(strip_tags($Parsedown->text($body)), 0, 150);
            $title = $meta['title'] ?? 'Untitled Post';
            $date = $meta['date'] ?? date('Y-m-d', filemtime($file));
            $filename = basename($file, '.md');
            $link = "https://yourdomain.com/blog/{$filename}.html"; // Adjust if needed
            $guid = $link;
            ?>

            <item>
              <title><?= htmlspecialchars($title) ?></title>
              <link><?= $link ?></link>
              <description><![CDATA[<?= $description ?>]]></description>
              <pubDate><?= date(DATE_RSS, strtotime($date)) ?></pubDate>
              <guid><?= $guid ?></guid>
            </item>

            <?php
        }
    }
    ?>
  </channel>
</rss>
