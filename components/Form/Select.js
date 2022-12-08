import ReactSelect from 'react-select'

const Select = ({ placeholder, options, handleChange, handleTouch, value }) => {
    return <ReactSelect
        styles={{
            control: provided => {
                return { ...provided, border: 'none' }
            },
            option: provided => {
                return {
                    ...provided,
                    cursor: 'pointer',
                    ':hover': {
                        opacity: '0.7',
                    },
                }
            },
        }}
        className='border-grey-light border dark:border-transparent rounded'
        classNamePrefix='outline-none text-black '
        placeholder={placeholder || '선택해주세요.'}
        options={options}
        onChange={handleChange}
        onBlur={handleTouch}
        noOptionsMessage={() => '검색 결과가 없습니다.'}
        defaultValue={value}
    />
}


export default Select
