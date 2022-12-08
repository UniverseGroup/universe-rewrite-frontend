import {Field} from "formik";

const Input = ({name,placeholder,disabled,...props})=>{
    return <Field
        {...props}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        className={`block p-4 w-full ${disabled?'text-gray-600 bg-gray-400 hover:cursor-not-allowed':'text-gray-900 bg-gray-50'} rounded-lg border border-gray-300 sm:text-md 
        focus:ring-blue-500 focus:border-blue-500 `}
    />
}
export default Input;
