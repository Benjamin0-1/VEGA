import { useDispatch } from "react-redux";
import { checkoutCancel } from "../../redux/actions/stripeAction";
import { useEffect } from "react";

const PayCancel = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(checkoutCancel())
    }, [ dispatch ]);
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
            <div className="bg-white rounded-lg p-8 shadow-lg w-3/5 h-1/2 flex flex-col items-center justify-center">
                <h2 className="text-black text-2xl mb-4">Tu compra ha sido cancelada</h2>
                <p className="text-center">
                    Vuelve a nuestra <a href="/home" className="text-blue-500 underline">tienda</a> para ver mas plantillas
                </p>
            </div>
        </div>
    );
};

export default PayCancel;