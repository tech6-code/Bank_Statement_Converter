// import React, { useRef, useState } from 'react'
// import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// function getFilenameFromDisposition(header) {
//     if (!header) return null
//     // content-disposition: attachment; filename="My File.xlsx"
//     const match = /filename="?([^"]+)"?/i.exec(header)
//     return match ? match[1] : null
// }

// export default function UploadBox() {
//     const inputRef = useRef(null)
//     const [file, setFile] = useState(null)
//     const [status, setStatus] = useState('idle') // idle | uploading | done | error
//     const [error, setError] = useState('')

//     const onPick = (e) => {
//         const f = e.target.files?.[0]
//         if (!f) return
//         if (!f.name.toLowerCase().endsWith('.pdf')) {
//             setError('Please select a PDF file.')
//             setFile(null)
//             return
//         }
//         setError('')
//         setFile(f)
//     }

//     const onDrop = (e) => {
//         e.preventDefault()
//         const f = e.dataTransfer.files?.[0]
//         if (!f) return
//         if (!f.name.toLowerCase().endsWith('.pdf')) {
//             setError('Please drop a PDF file.')
//             setFile(null)
//             return
//         }
//         setError('')
//         setFile(f)
//     }

//     const prevent = (e) => e.preventDefault()

//     const convertNow = async () => {
//         if (!file) return
//         setStatus('uploading')
//         setError('')
//         try {
//             const fd = new FormData()
//             fd.append('file', file)

//             const resp = await fetch(`${API_URL}/api/convert`, {
//                 method: 'POST',
//                 body: fd,
//             })

//             if (!resp.ok) {
//                 // try to read json error from server
//                 let msg = 'Conversion failed'
//                 try {
//                     const j = await resp.json()
//                     if (j?.error) msg = j.error
//                 } catch { }
//                 throw new Error(msg)
//             }

//             // get filename from headers (server sets Content-Disposition)
//             const dispo = resp.headers.get('content-disposition')
//             const suggested = getFilenameFromDisposition(dispo)
//             const fallback = (file.name.replace(/\.pdf$/i, '') || 'converted') + '.xlsx'
//             const filename = suggested || fallback

//             // read and download
//             const blob = await resp.blob()
//             const url = URL.createObjectURL(blob)
//             const a = document.createElement('a')
//             a.href = url
//             a.download = filename
//             document.body.appendChild(a)
//             a.click()
//             a.remove()
//             URL.revokeObjectURL(url)

//             setStatus('done')
//         } catch (e) {
//             setError(e.message || 'Something went wrong')
//             setStatus('error')
//         }
//     }

//     return (
//         <div
//             onDrop={onDrop}
//             onDragOver={prevent}
//             onDragEnter={prevent}
//             onDragLeave={prevent}
//             className="border-2 border-dashed rounded-2xl p-8 bg-gray-50 hover:bg-gray-100 transition"
//         >
//             <div className="flex flex-col items-center text-center gap-4">
//                 <div className="p-3 rounded-full bg-white border">
//                     <Upload className="h-6 w-6 text-emerald-600 cursor-pointer" />
//                 </div>

//                 <div className="text-sm text-gray-700">
//                     <button
//                         className="text-emerald-700 cursor-pointer underline font-medium"
//                         onClick={() => inputRef.current?.click()}
//                     >
//                         Click to choose
//                     </button>{' '}
//                     or drag & drop a PDF here
//                 </div>

//                 <input
//                     ref={inputRef}
//                     type="file"
//                     accept="application/pdf"
//                     onChange={onPick}
//                     className="hidden"
//                 />

//                 {file && (
//                     <div className="mt-2 text-sm text-gray-800">
//                         Selected: <b>{file.name}</b> ({Math.round(file.size / 1024)} KB)
//                     </div>
//                 )}

//                 <div className="mt-6">
//                     <button
//                         onClick={convertNow}
//                         disabled={!file || status === 'uploading'}
//                         className="inline-flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
//                     >
//                         {status === 'uploading' ? (
//                             <>
//                                 <Loader2 className="h-4 w-4 animate-spin" />
//                                 Converting…
//                             </>
//                         ) : (
//                             <>Convert to Excel</>
//                         )}
//                     </button>
//                 </div>

//                 {status === 'done' && (
//                     <div className="mt-4 flex items-center gap-2 text-emerald-700 text-sm">
//                         <CheckCircle2 className="h-5 w-5" />
//                         Your Excel file has downloaded.
//                     </div>
//                 )}

//                 {status === 'error' && (
//                     <div className="mt-4 flex items-center gap-2 text-red-600 text-sm">
//                         <AlertCircle className="h-5 w-5" />
//                         {error}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }






import React, { useRef, useState } from 'react'
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function getFilenameFromDisposition(header) {
    if (!header) return null
    const match = /filename="?([^"]+)"?/i.exec(header)
    return match ? match[1] : null
}

export default function UploadBox() {
    const inputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [status, setStatus] = useState('idle') // idle | uploading | done | error
    const [error, setError] = useState('')

    // handy reset for after success
    const reset = () => {
        setFile(null)
        setError('')
        setStatus('idle')
        if (inputRef.current) inputRef.current.value = '' // clear native file input
    }

    const onPick = (e) => {
        const f = e.target.files?.[0]
        if (!f) return
        if (!f.name.toLowerCase().endsWith('.pdf')) {
            setError('Please select a PDF file.')
            setFile(null)
            return
        }
        setError('')
        setFile(f)
    }

    const onDrop = (e) => {
        e.preventDefault()
        const f = e.dataTransfer.files?.[0]
        if (!f) return
        if (!f.name.toLowerCase().endsWith('.pdf')) {
            setError('Please drop a PDF file.')
            setFile(null)
            return
        }
        setError('')
        setFile(f)
    }

    const prevent = (e) => e.preventDefault()

    const convertNow = async () => {
        if (!file) return
        setStatus('uploading')
        setError('')
        try {
            const fd = new FormData()
            fd.append('file', file)

            const resp = await fetch(`${API_URL}/api/convert`, {
                method: 'POST',
                body: fd,
            })

            if (!resp.ok) {
                let msg = 'Conversion failed'
                try {
                    const j = await resp.json()
                    if (j?.error) msg = j.error
                } catch { }
                throw new Error(msg)
            }

            const dispo = resp.headers.get('content-disposition')
            const suggested = getFilenameFromDisposition(dispo)
            const fallback = (file.name.replace(/\.pdf$/i, '') || 'converted') + '.xlsx'
            const filename = suggested || fallback

            const blob = await resp.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)

            // show success briefly, then clear everything
            setStatus('done')
            setTimeout(() => {
                reset()
            }, 1500) // change duration if you want immediate reset: set to 0
        } catch (e) {
            setError(e.message || 'Something went wrong')
            setStatus('error')
        }
    }

    return (
        <div
            onDrop={onDrop}
            onDragOver={prevent}
            onDragEnter={prevent}
            onDragLeave={prevent}
            className="border-2 border-dashed rounded-2xl p-8 bg-gray-50 hover:bg-gray-100 transition"
        >
            <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-white border">
                    <Upload className="h-6 w-6 text-emerald-600 cursor-pointer" onClick={() => inputRef.current?.click()} />
                </div>

                <div className="text-sm text-gray-700">
                    <button
                        className="text-emerald-700 cursor-pointer underline font-medium"
                        onClick={() => inputRef.current?.click()}
                    >
                        Click to choose
                    </button>{' '}
                    or drag & drop a PDF here
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={onPick}
                    className="hidden"
                />

                {file && (
                    <div className="mt-2 text-sm text-gray-800">
                        Selected: <b>{file.name}</b> ({Math.round(file.size / 1024)} KB)
                    </div>
                )}

                <div className="mt-6">
                    <button
                        onClick={convertNow}
                        disabled={!file || status === 'uploading'}
                        className="inline-flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
                    >
                        {status === 'uploading' ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Converting…
                            </>
                        ) : (
                            <>Convert to Excel</>
                        )}
                    </button>
                </div>

                {status === 'done' && (
                    <div className="mt-4 flex items-center gap-2 text-emerald-700 text-sm">
                        <CheckCircle2 className="h-5 w-5" />
                        Your Excel file has downloaded.
                    </div>
                )}

                {status === 'error' && (
                    <div className="mt-4 flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-5 w-5" />
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}
