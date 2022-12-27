import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiRequest";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function LoginForm() {
    const [toggleTab, setToggleTab] = useState(1);

    const handleToggleTab = (index) => {
        setToggleTab(index);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = e => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password
        };

        const error = loginUser(newUser, dispatch, navigate);
        error.then(res => {
            if(res) {
                setErrorEmail(res.data[0]);
                setErrorPassword(res.data[1]);
            }
        });
    }

    return (
        <div className="container  max-w-[600px] mx-auto px-8 py-6 shadow-2xl mt-8 mb-8">
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
                    <form onSubmit={handleLogin}>
                    <div className="flex flex-col mt-4">
                        <label className="text-xl font-semibold uppercase" htmlFor="">Email</label>
                        <input 
                            className="bg-[#ccc] rounded-full w-full h-9 mt-4 mb-5 bg-opacity-50 pl-4" 
                            type="text"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <p className="text-sm text-red-500 ml-2">{errorEmail}</p>
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="text-xl font-semibold uppercase" htmlFor="">Mật khẩu</label>
                        <div className="relative">
                            <input
                                className="bg-[#ccc] rounded-full w-full h-9 mt-4 mb-5 bg-opacity-50 pl-4"
                                type={showPassword ? "text" : "password"}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="cursor-pointer" onClick={handleShowPassword}>
                                {showPassword ? (
                                    <AiOutlineEye size={20} className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4"/>
                                ) : (
                                    <AiOutlineEyeInvisible size={20} className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4"/>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-red-500 ml-2">{errorPassword}</p>
                    </div>
                    <div className="mt-6 flex flex-col item-center">
                        <div className="mx-auto">
                            <button
                                type="submit"
                                className="px-6 py-2 text-white bg-blue-600 rounded-full hover:scale-125 duration-300"
                                
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <p className="text-center my-4">hoặc</p>
                        <div className="mx-auto">
                            <Link to="/register">
                                <button className="px-6 py-2 text-white bg-blue-600 rounded-full hover:scale-125 duration-300">
                                    Tạo tài khoản
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
                ) : (
                    <form action="">
                    <div className="flex flex-col mt-4">
                        <label className="text-xl font-semibold uppercase" htmlFor="">Tên đăng nhập</label>
                        <input className="bg-[#ccc] rounded-full w-full h-9 my-4 bg-opacity-50 pl-4" type="text" />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="text-xl font-semibold uppercase" htmlFor="">Mật khẩu</label>
                        <input className="bg-[#ccc] rounded-full w-full h-9 my-4 bg-opacity-50 pl-4" type="password" />
                    </div>
                    <div className="mt-6 flex flex-col item-center">
                        <div className="mx-auto">
                            <button className="px-6 py-2 text-white bg-blue-600 rounded-full hover:scale-125 duration-300">Đăng nhập</button>
                        </div>
                        <p className="text-center my-4">hoặc</p>
                        <div className="mx-auto">
                        <Link to="/register">
                            <button className="px-6 py-2 text-white bg-blue-600 rounded-full hover:scale-125 duration-300">Tạo tài khoản</button>
                        </Link>
                        </div>
                    </div>
                </form>
                )}

            </div>
        </div>
    );
};

export default LoginForm;