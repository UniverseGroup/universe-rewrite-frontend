/* eslint-disable jsx-a11y/no-autofocus */
import { useRef, useState } from 'react'
import { Field } from 'formik'
import { Picker } from "emoji-mart";
import useOutsideClick from '../../tool/useOutsideClick'
import "emoji-mart/css/emoji-mart.css"


const TextArea = ({ name, placeholder, max, setValue, value }) => {
    const ref = useRef()
    const [ emojiPickerHidden, setEmojiPickerHidden ] = useState(true)
    useOutsideClick(ref, () => {
        setEmojiPickerHidden(true)
    })

    return <div className="h-96 w-full relative">
        <Field as='textarea' name={name} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative h-full resize-none' placeholder={placeholder} />
        <div ref={ref}>
            <div className='absolute bottom-12 left-10 z-30'>
                {
                    !emojiPickerHidden && <Picker title='선택해주세요' emoji='sunglasses' set='twitter' enableFrequentEmojiSort showSkinTones={false} onSelect={(e) => {
                        setEmojiPickerHidden(true)
                        setValue(value + ' ' + ((e.native || e.colons)))
                    }} i18n={{
                        search: '검색',
                        notfound: '검색 결과가 없습니다.',
                        categories: {
                            search: '검색 결과',
                            recent: '최근 사용',
                            people: '사람',
                            nature: '자연',
                            foods: '음식',
                            activity: '활동',
                            places: '장소',
                            objects: '사물',
                            symbols: '기호',
                            flags: '국기',
                            custom: '커스텀'
                        }
                    }}/>
                }
            </div>
            <div className='absolute bottom-2 left-4 hidden sm:block'>
                <div className='emoji-selector-button outline-none' onClick={() => setEmojiPickerHidden(false)} onKeyPress={() => setEmojiPickerHidden(false)} role='button' tabIndex={0} />
            </div>
            {
                max && <span className={`absolute bottom-2 right-4 ${max < value.length ? ' text-red-400' : 'text-blue-300'}`}>
					{max-value.length}
				</span>
            }
        </div>
    </div>
}


export default TextArea
