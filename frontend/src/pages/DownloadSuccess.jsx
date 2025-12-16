import { FaCheckCircle, FaArrowLeft, FaFileDownload, FaHome  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function DownloadSuccess() {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white p-6">
            <div className="bg-white max-w-lg w-full shadow-2xl rounded-3xl p-10 border border-gray-200 relative overflow-hidden">

                {/* Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-green-100/30 to-transparent pointer-events-none"></div>

                <div className="text-center">
                    <FaCheckCircle className="text-green-600 mx-auto mb-4" size={70} />
                    <h1 className="text-3xl font-bold text-gray-800">Resume Downloaded!</h1>

                    <p className="text-gray-600 mt-2">
                        Your resume is ready. What would you like to do next?
                    </p>

                    <div className="mt-8 flex flex-col gap-3">

                        <button className="cursor-pointer flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl text-lg font-semibold hover:bg-gray-50 transition" onClick={()=>navigate("/preview")}>
                            <FaArrowLeft size={20}  /> Go Back & Download Again
                        </button>

                        <button className="cursor-pointer flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-3 rounded-xl text-lg font-semibold transition" onClick={() => navigate("/")}>
                            <FaHome size={20} /> Go to Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

