import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkoutSuccess } from "../../redux/actions/stripeAction";

const PaySuccess = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkoutSuccess())
  }, [ dispatch ]);
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-lg w-3/5 h-1/2 flex flex-col items-center justify-center">
        <h2 className="text-black text-2xl mb-4">Tu compra ha sido realizada</h2>
        <p className="text-center">
          Ve a tu <a href="/profile" className="text-blue-500 underline">perfil</a> para ver tu plantilla
        </p>
      </div>
    </div>
  );
};

export default PaySuccess;