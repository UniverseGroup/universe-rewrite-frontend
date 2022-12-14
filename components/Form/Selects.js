import ReactSelect, { components } from 'react-select'
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
} from 'react-sortable-hoc'

function arrayMove(array, from, to) {
    array = array.slice()
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0])
    return array
}

const SortableMultiValue = SortableElement(props => {
    // this prevents the menu from being opened/closed when the user clicks
    // on a value to begin dragging it. ideally, detecting a click (instead of
    // a drag) would still focus the control and toggle the menu, but that
    // requires some magic with refs that are out of scope for this example
    const onMouseDown = e => {
        e.preventDefault()
        e.stopPropagation()
    }
    const innerProps = { ...props.innerProps, onMouseDown }
    return <components.MultiValue {...props} innerProps={innerProps} />
})

const SortableMultiValueLabel = SortableHandle(props => (
    <components.MultiValueLabel {...props} />
))

const SortableSelect = SortableContainer(ReactSelect)

const Select = ({ placeholder, options, values, setValues, handleChange, handleTouch }) => {
    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(values, oldIndex, newIndex)
        setValues(newValue)
    }
    return <SortableSelect useDragHandle axis='xy' distance={4} getHelperDimensions={({ node }) => node.getBoundingClientRect()} onSortEnd={onSortEnd}
        // select props
                           styles={{
                               control: (provided) => {
                                   return { ...provided, border: 'none' }
                               },
                               option: (provided) => {
                                   return { ...provided, cursor: 'pointer', ':hover': {
                                           opacity: '0.7'
                                       } }
                               }
                           }} isMulti className='border border-grey-light dark:border-transparent rounded' classNamePrefix='outline-none text-black cursor-pointer ' placeholder={placeholder || '??????????????????.'} options={options} onChange={handleChange} onBlur={handleTouch} noOptionsMessage={() => '?????? ????????? ????????????.'}
                           value={values.map(el => ({ label: el, value: el}))}
                           components={{
                               MultiValue: SortableMultiValue,
                               MultiValueLabel: SortableMultiValueLabel,
                           }}
                           closeMenuOnSelect={false}
    />
}

export default Select
