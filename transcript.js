const downloadFolder = 'transcripts';
const sanitizeRegex = /[^a-z0-9à-ú .-]/gi;
const transcriptionsKey = 'transcriptions';

const downloadActionName = "downloadTranscriptAction";

function getTitle() {
    return dom.getCurrentTranscriptTitle();
}

function get() {
    return Array.from(dom.getTranscriptEl())
        .map(x => x.textContent)
        .join("\n");
}

async function download({key, transcript}) {
    
    // Sanitize filename
    const fileName = key.replace(sanitizeRegex, '_').trim();
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    //Send to background
    await browser.runtime.sendMessage({
        action: downloadActionName,
        fileName: `${downloadFolder}/${fileName}.txt`,
        transcriptContent: transcript
    });
}

async function save(transcript) {
    if (!transcript) throw new Error("No transcript provided");

    const data = await storage.get(transcriptionsKey);
    const key = getTitle() || "Unknown Title";
    const storedTranscripts = data.transcriptions || {};
    
    // if already in the map throw exception
    if (storedTranscripts[key]) throw new Error("Transcript already exists");
    
    storedTranscripts[key] = transcript;
    
    // Save it back using browser.storage.local
    await storage.save(transcriptionsKey, storedTranscripts);

    return { key, transcript }
}

const transcript = { download, downloadActionName, get, save };

