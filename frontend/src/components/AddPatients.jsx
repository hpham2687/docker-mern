import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { CgAsterisk } from 'react-icons/cg';
import { useDispatch } from "react-redux";
import { addPatients } from "../redux/apiRequest";

function AddPatients() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const inputRef = useRef();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);

    const handleSubmit = async e => {
        e.preventDefault();

        const newAge = age;
        const nA = parseInt(newAge, 10);

        const newPatient = {
            name: name,
            age: nA,
            address: address
        };

        addPatients(user, newPatient, dispatch);

        setName("");
        setAge("");
        setAddress("");
        setShowSuccess(true);
        inputRef.current.focus();
    };

    return (
        <div className="container max-w-[900px] mx-auto pt-12">
            <h1 className="text-3xl font-semibold mb-5">Thêm bệnh nhân</h1>
            {showSuccess ? (
                <p className="text-md text-red-500 flex items-center">
                    <CgAsterisk />
                    Thêm thành công
                </p>
            ) : (
                <div className="py-3">
                </div>
            )}
            <div className="flex">
                <form onSubmit={handleSubmit} className="w-1/2">
                    <div className="py-4 flex flex-col">
                        <label className="text-xl flex items-center" htmlFor="">
                            <CgAsterisk className="text-red-500" size={15}/>
                            Họ và tên
                        </label>
                        <input
                            value={name}
                            className="border border-black rounded-sm w-full mt-2 pl-4 py-1 pr-1"
                            type="text"
                            onChange={e => {
                                setName(e.target.value);
                                setShowSuccess(false);
                            }}
                            required
                            ref={inputRef}
                        />
                    </div>
                    <div className="py-4 flex flex-col">
                        <label className="text-xl flex items-center" htmlFor="">
                            <CgAsterisk className="text-red-500" size={15}/>
                            Tuổi
                        </label>
                        <input
                            value={age}
                            className="border border-black rounded-sm w-full mt-2 pl-4 py-1 pr-1"
                            type="text"
                            onChange={e => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <div className="py-4 flex flex-col">
                        <label className="text-xl flex items-center" htmlFor="">
                            <CgAsterisk className="text-red-500" size={15}/>
                            Địa chỉ
                        </label>
                        <input
                            value={address}
                            className="border border-black rounded-sm w-full mt-2 pl-4 py-1 pr-1"
                            type="text"
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-1 bg-blue-500 text-white rounded-full mt-4 float-right hover:scale-110 duration-300"
                        
                    >
                        Thêm
                    </button>
                </form>
                <div></div>
            </div>
        </div>
    );
};

export default AddPatients;