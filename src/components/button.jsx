import React from "react";

const Button = ({ onClick }) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-12 p-4 rounded w-fit self-center"
            onClick={onClick}
        >
            Click me!
        </button>
    );
};

export default Button;
