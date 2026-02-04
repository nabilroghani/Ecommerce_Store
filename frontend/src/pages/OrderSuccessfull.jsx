import { useNavigate } from "react-router-dom";
const OrderSuccessfull = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Thank You for Shopping!</h2>
        <p className="text-gray-600 mb-6">Aapka order kamyabi se receive ho gaya hai. Hum jald hi aap se rabta karenge.</p>
        
        <div className="bg-blue-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-blue-700 font-medium">Mazid malomat ke liye humein email karein:</p>
          <a href="mailto:nabilroghani96@gmail.com" className="text-blue-600 font-bold hover:underline">
            nabilroghani96@gmail.com
          </a>
        </div>

        <button 
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessfull;