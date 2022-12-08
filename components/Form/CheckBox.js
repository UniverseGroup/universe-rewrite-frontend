import { Field } from 'formik'

const CheckBox = ({ name, ...props }) => {
    return (
        <Field
            {...props}
            name={name}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />

    )
}
export default CheckBox;
