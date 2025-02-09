const express = require("express");
const cors = require("cors");
const path = require("path");
const ftp = require("basic-ftp");
const { WritableStreamBuffer } = require("stream-buffers");

const app = express();
const PORT = 3000; // change port webserver other you need
const FTP_HOST = "127.0.0.1"; //  ftp you ip or hostname  
const FTP_PORT = 21; // ftp you port 
const FTP_USER = "dayz"; // ftp you username
const FTP_PASS = "Aa123456";  // ftp you password

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

async function fetchFTPData() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: FTP_HOST,
            port: FTP_PORT,
            user: FTP_USER,
            password: FTP_PASS,
        });

        const fileList = await client.list();
        const statsRegex = /^Stats-765611\d{11}\.json$/;
        let statsData = [];

        for (const file of fileList) {
            if (statsRegex.test(file.name)) {
                try {
                    const writableBuffer = new WritableStreamBuffer();
                    await client.downloadTo(writableBuffer, file.name);
                    const fileContent = writableBuffer.getContentsAsString("utf8");

                    if (fileContent && fileContent.trim().length > 0) {
                        try {
                            let jsonData = JSON.parse(fileContent);

                            // Convert distance before sending
                            let km = Math.floor(jsonData.distTrav / 1000);
                            let meters = jsonData.distTrav % 1000;
                            jsonData.distTravFormatted = `${km} km ${meters} m`;

                            statsData.push(jsonData);
                        } catch (jsonError) {
                            console.error(`JSON Parse Error in ${file.name}:`, jsonError);
                        }
                    } else {
                        console.warn(`Skipping empty file: ${file.name}`);
                    }
                } catch (fileError) {
                    console.error(`Error downloading file ${file.name}:`, fileError);
                }
            }
        }

        return statsData;
    } catch (error) {
        console.error("FTP Error:", error);
        return [];
    } finally {
        client.close();
    }
}

app.get("/data", async (req, res) => {
    try {
        let statsData = await fetchFTPData();
        statsData = statsData.sort((a, b) => (b.kills?.length || 0) - (a.kills?.length || 0)).slice(0, 50);
        res.json(statsData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/leaderboard", async (req, res) => {
    try {
        let statsData = await fetchFTPData();
        statsData = statsData.sort((a, b) => (b.kills?.length || 0) - (a.kills?.length || 0)).slice(0, 50);
        res.render("leaderboard", { statsData });
    } catch (error) {
        res.status(500).send("Failed to load leaderboard.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

