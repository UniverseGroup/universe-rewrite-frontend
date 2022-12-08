import MarkdownView from 'react-showdown'
import sanitizeHtml from 'sanitize-html'
import Emoji from 'node-emoji'
import {useEffect} from 'react'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
const Markdown = ({ text, options={}, allowedTag=[], components={} }) => {
    return (
        <div className='markdown-body w-full text-white bg-discord-dark-hover p-5 rounded-xl'>
            <MarkdownView
                markdown={Emoji.emojify(text)}
                options={{
                    openLinksInNewWindow: true,
                    underline: true,
                    omitExtraWLInCodeBlocks: true,
                    // literalMidWordUnderscores: true,
                    simplifiedAutoLink: true,
                    tables: true,
                    strikethrough: true,
                    smoothLivePreview: true,
                    tasklists: true,
                    ghCompatibleHeaderId: true,
                    encodeEmails: true,
                    ghCodeBlocks:true,
                    ...options
                }}
                components={components}
                sanitizeHtml={html =>
                    sanitizeHtml(html, {
                        allowedTags: [
                            'addr',
                            'address',
                            'article',
                            'aside',
                            'h1',
                            'h2',
                            'h3',
                            'h4',
                            'h5',
                            'h6',
                            'section',
                            'blockquote',
                            'dd',
                            'div',
                            'dl',
                            'dt',
                            'hr',
                            'li',
                            'ol',
                            'p',
                            'pre',
                            'ul',
                            'a',
                            'abbr',
                            'b',
                            'bdi',
                            'bdo',
                            'br',
                            'cite',
                            'code',
                            'data',
                            'dfn',
                            'em',
                            'i',
                            'kbd',
                            'mark',
                            'q',
                            'rb',
                            'rp',
                            'rt',
                            'rtc',
                            'ruby',
                            's',
                            'samp',
                            'small',
                            'span',
                            'strong',
                            'sub',
                            'sup',
                            'time',
                            'u',
                            'var',
                            'wbr',
                            'caption',
                            'col',
                            'colgroup',
                            'table',
                            'tbody',
                            'td',
                            'tfoot',
                            'th',
                            'thead',
                            'tr',
                            'del',
                            'ins',
                            'img',
                            'svg',
                            'path',
                            'input',
                            ...allowedTag
                        ],
                        allowedAttributes: false,
                        allowedClasses: {
                            '*': ['align-middle'],
                            a: ['mr-1'],
                        },
                        allowedStyles: {}
                    })
                }
                flavor={'github'}
            />
        </div>
    )
}


export default Markdown
