<?php
include 'Parsedown.php';

$parsedown = new Parsedown();
$md_file = __DIR__ . '/documents/resume.md';

if (!file_exists($md_file)) {
    echo "Resume not found.";
    exit;
}

$md_content = file_get_contents($md_file);
$html = $parsedown->text($md_content);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Resume</title>
    <link rel="stylesheet" href="./styles/resume-test.css">
    <link rel="stylesheet" href="./styles/navbar.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        /* Resume-specific tweaks */
        .resume {
            max-width: 800px;
            margin: 2rem auto;
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .resume h1,
        .resume h2,
        .resume h3 {
            color: #2c3e50;
        }

        .resume ul {
            padding-left: 1.5rem;
        }
    </style>
</head>

<body>
  <div style="width: 100%; position: fixed; top: 0; left: 0; z-index: 1;">
        <header class="navbar">
            <nav class="links" style="display: flex; justify-content: center; gap: 1rem;">
                <a href="./">🏠 Home</a>
                <a href="blog.html">📝 Blog</a>
                <a href="projects.html">💻 Projects</a>
                <a href="editor.php">📝 Markdown Editor</a>
            </nav>
        </header>
    </div>
    <!-- <header>
        <button class="download-btn" onclick="downloadPDF()">Download PDF</button>
    </header> -->
    <div class="resume">
        <?= $html ?>
    </div>

    <script>
        function downloadPDF() {
            const element = document.querySelector(".resume");
            const opt = {
                margin: 0.5,
                filename: 'resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        }
    </script>

</body>

</html>