const MessageBox = ({ type, children}) => {
    const getType = (type) => {
        const defaultClass = 'p-4 mb-4 text-sm rounded-lg'
        switch (type) {
            case 'info':
                return `${defaultClass} bg-blue-200 text-blue-800`;
            case 'error':
                return `${defaultClass} bg-red-200 text-red-800`;
            case 'warning':
                return `${defaultClass} bg-yellow-200 text-yellow-800`;
            case 'success':
                return `${defaultClass} bg-green-200 text-green-800`;
            default:
                return `${defaultClass} bg-gray-200 text-gray-800`;
        }
    }
    return (
        <div className={getType(type)}
             role="alert">
            {children}
        </div>
    )
}
export default MessageBox;
