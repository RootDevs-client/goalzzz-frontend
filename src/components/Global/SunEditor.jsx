'use client';

import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  image,
  lineHeight,
  link,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  video,
} from 'suneditor/src/plugins';

const ImportSunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

function SunEditor({ height, setFieldValue, inputFiled, defaultValue }) {
  return (
    <ImportSunEditor
      defaultValue={defaultValue || ''}
      height={height || 200}
      lang="en"
      setOptions={{
        showPathLabel: false,
        placeholder: 'Enter your text here!!!',
        plugins: [
          align,
          font,
          fontColor,
          fontSize,
          formatBlock,
          hiliteColor,
          horizontalRule,
          lineHeight,
          list,
          paragraphStyle,
          table,
          template,
          textStyle,
          image,
          link,
          video,
        ],
        buttonList: [
          ['undo', 'redo'],
          ['removeFormat'],
          ['fontSize'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor'],
          // '/', // Line break
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['table', 'link', 'image', 'video'],
          ['fullScreen', 'codeView'],
        ],
      }}
      onChange={(value) => {
        const removeHtmlTags = value.replace(/<[^>]*>/g, '');
        removeHtmlTags
          ? setFieldValue(inputFiled, value)
          : setFieldValue(inputFiled, '');
      }}
    />
  );
}

export default SunEditor;
