import { useQuery } from "@tanstack/react-query";
import { deleteApartment } from "../api/apartments";
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";



const DelModal = ({setIsModal, id}) => {

    const navigate = useNavigate();

    const { data: delAppart } = useQuery({
    queryKey: ["delAppart"],
    queryFn: () => deleteApartment(id),
  });

    function handleDel(){
        delAppart;
        navigate("/")
    }

  return (
    <div className="fixed left-0 top-0 w-full h-screen z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center py-1.5 px-3 w-155.75 h-56 bg-white rounded-[10px] shadow-[5px_5px_4px_0px_rgba(0,0,0,0.08)]">
        <svg onClick={() => setIsModal(false)}
          className="self-end cursor-pointer mb-1.25"
          xmlns="http://www.w3.org/2000/svg"
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
        >
          <path
            d="M23.5011 23.4999L29.0401 29.0389M17.9622 29.0389L23.5011 23.4999L17.9622 29.0389ZM29.0401 17.9609L23.5011 23.4999L29.0401 17.9609ZM23.5011 23.4999L17.9622 17.9609L23.5011 23.4999Z"
            stroke="#2D3648"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h5
          className="mb-8.75 text-gray-700
text-xl
font-bold "
        >
          გსურთ წაშალოთ ლისტინგი?
        </h5>
        <div className="flex gap-2">
          <Button handleClick={() => setIsModal(false)} color={`white`}>გაუქმება</Button>
          <Button handleClick={() => handleDel()} color={`orange`}>დადასტურება</Button>
        </div>
      </div>
    </div>
  );
};

export default DelModal;
