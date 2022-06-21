import { Input, Select } from 'antd';
import { CodeBlock, dracula } from "react-code-blocks";

import { SupportedLanguages } from '../../../utils/constant';

import Styles from './CodeSnippet.module.css';

const { TextArea } = Input;
const { Option } = Select;

const CodeSnippetBlock = ({ data, onCodeChange, onLanguageChange, readOnly = false }) => {
    return (
        <div className={Styles.codeSnippetContainer}>
            <CodeBlock
                text={data?.content?.codeSnippet?.code || ''}
                language={data?.content?.codeSnippet?.language || SupportedLanguages?.[0]}
                showLineNumbers={true}
                theme={dracula}
            />
            {
                !readOnly ? (
                    <>
                        <TextArea
                            placeholder='Write your code here...'
                            value={data?.content?.codeSnippet?.code || ''}
                            onChange={(e) => onCodeChange?.(e.target.value || '')}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                        <Select
                            style={{ width: 200 }}
                            defaultValue={data?.content?.codeSnippet?.language || SupportedLanguages?.[0]}
                            value={data?.content?.codeSnippet?.language || SupportedLanguages?.[0]}
                            onChange={(value) => onLanguageChange?.(value)}
                        >
                            {
                                SupportedLanguages?.map((lang) => <Option key={lang} value={lang}>{lang}</Option>)
                            }
                        </Select>
                    </>
                ) : null
            }
        </div>
    )
}

export default CodeSnippetBlock;