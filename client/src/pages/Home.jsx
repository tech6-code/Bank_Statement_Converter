import UploadBox from '../components/UploadBox.jsx'

export default function Home() {
    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-2xl shadow-sm border p-8">
                <h2 className="text-lg font-semibold mb-2">Upload your bank statement (PDF)</h2>
                <p className="text-sm text-gray-600 mb-6">
                    We’ll convert it to a clean <strong>.xlsx</strong> file for download. Processing happens on the server (API key stays safe).
                </p>
                <UploadBox />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-8">
                <h3 className="text-base font-semibold mb-3">Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Only <b>PDF</b> files are accepted.</li>
                    <li>Large image-heavy PDFs can take longer to convert.</li>
                    <li>We stream the converted Excel directly — no long-term storage.</li>
                </ul>
            </div>
        </div>
    )
}
