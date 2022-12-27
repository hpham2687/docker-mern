import React, { useState } from 'react'
import { registerUser } from '../redux/apiRequest';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = () => {
    const [toggleTab, setToggleTab] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();

        const newUser = {
            email: email,
            password: password
        };

        registerUser(newUser, dispatch, navigate);
    }

    const handleToggleTab = (index) => {
        setToggleTab(index);
    }

    return (
        <div className="container  max-w-[600px] mx-auto p-8 shadow-2xl mt-24">
            <header className="flex relative justify-around items-center">
                <h2 onClick={() => handleToggleTab(1)}
                    className={toggleTab === 1 ? 'header-link header-link-after' : 'header-link'}>
                    Bác sĩ
                </h2>
                <h2 onClick={() => handleToggleTab(2)}
                    className={toggleTab === 2 ? 'header-link header-link-after' : 'header-link'}>
                    Admin
                </h2>
            </header>
            <div className="max-w-[500px] mx-auto">
                {toggleTab === 1 ? (
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-col mt-4">
                            <label className="text-xl font-semibold uppercase" htmlFor="">Email</label>
                            <input
                                className="bg-[#ccc] rounded-full w-full h-9 my-4 bg-opacity-50 pl-4"
                                type="text"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className="text-xl font-semibold uppercase" htmlFor="">Mật khẩu</label>
                            <input
                                className="bg-[#ccc] rounded-full w-full h-9 my-4 bg-opacity-50 pl-4"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-6 flex flex-col item-center">
                            <div className="mx-auto">
                                <button
                                    className="px-6 py-2 text-white bg-blue-600 rounded-full"
                                    type="submit"
                                >
                                    Tạo tài khoản
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form action="">
                        <div className="flex flex-col mt-4">
                            <label className="text-xl font-semibold uppercase" htmlFor="">Email</label>
                            <input
                                className="bg-[#ccc] rounded-full w-full h-9 my-4 bg-opacity-50 pl-4"
                                type="text"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className="text-xl font-semibold uppercase" htmlFor="">Mật khẩu</label>
                            <input
                                className="bg-[#ccc] rounded-full w-full h-9 my-4 bg-opacity-50 pl-4"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-6 flex flex-col item-center">
                            <div className="mx-auto">
                                <button className="px-6 py-2 text-white bg-blue-600 rounded-full">Tạo tài khoản</button>
                            </div>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
}

export default CreateAccountForm
