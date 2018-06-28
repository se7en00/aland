import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import classNames from 'classnames/bind';
import style from './RichTextBox.scss';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class RichTextBox extends Component {
    static propTypes = {
        input: PropTypes.object,
        className: PropTypes.string,
        onlyTextEditable: PropTypes.bool
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered'}, { list: 'bullet' }],
            [{ script: 'sub'}, { script: 'super' }], // superscript/subscript
            [{ indent: '-1'}, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ['clean'], // remove formatting button
            !this.props.onlyTextEditable ? ['link', 'image', 'video'] : null
        ].filter(Boolean)
    }

    onBlur = (range, source, quill) => {
        this.props.input.onBlur(quill.getHTML());
    }

    render() {
        const {
            input,
            className
        } = this.props;
        const cx = classNames.bind(style);
        const richTextClass = cx(className, 'richText-wrapper');
        return (
            <div className={richTextClass}>
                <ReactQuill
                    {...input}
                    className="u-full-height"
                    theme="snow"
                    modules={this.modules}
                    onChange={input.onChange}
                    onBlur={this.onBlur}
                />
            </div>
        );
    }
}

export default RichTextBox;
