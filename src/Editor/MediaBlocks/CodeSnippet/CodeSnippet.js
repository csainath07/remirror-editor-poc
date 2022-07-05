import { Input, Select } from 'antd';
import { CodeBlock, a11yDark } from "react-code-blocks";

import { SupportedLanguages } from '../../../utils/constant';

import Styles from './CodeSnippet.module.css';

const { TextArea } = Input;
const { Option } = Select;

const CodeSnippetBlock = ({ data, onCodeChange, onLanguageChange, editable = false }) => {
    return (
        <div className={Styles.codeSnippetContainer}>
            <CodeBlock
                text={data?.content?.codeSnippet?.code || ''}
                language={data?.content?.codeSnippet?.language || SupportedLanguages?.[0]}
                showLineNumbers={true}
                theme={a11yDark}
                customStyle={{
                    height: '250px',
                    overflowY: 'scroll',
                    borderRadius: '0px',
                  }}
            />
            {
                editable ? (
                    <div className={Styles.codeContainer}>
                        <TextArea
                            placeholder='Write your code here...'
                            value={data?.content?.codeSnippet?.code || ''}
                            onChange={(e) => onCodeChange?.(e.target.value || '')}
                            autoSize={{ minRows: 4, maxRows: 6 }}
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
                    </div>
                ) : null
            }
        </div>
    )
}

export default CodeSnippetBlock;