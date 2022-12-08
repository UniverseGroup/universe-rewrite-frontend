const Label = ({
                                         For,
                                         children,
                                         label,
                                         labelDesc,
                                         error = null,
                                         grid = true,
                                         short = false,
                                         required = false,
                                     }) => {
    return <label
        className={grid ? 'grid grid-cols-1 xl:grid-cols-4 gap-2 my-4' : 'inline-flex items-center'}
        htmlFor={For}
    >
        {label && (
            <div className='col-span-1 text-sm text-gray-300'>
                <h3 className='text-universe-blue text-lg font-bold'>
                    {label}
                    {required && (
                        <span className='align-text-top text-red-500 text-base font-semibold'> *</span>
                    )}
                </h3>
                {labelDesc}
            </div>
        )}
        <div className={short ? 'col-span-1' : 'col-span-3'}>
            {children}
            <div className='mt-1 text-red-500 text-xs font-light'>{error}</div>
        </div>
    </label>
}


export default Label
