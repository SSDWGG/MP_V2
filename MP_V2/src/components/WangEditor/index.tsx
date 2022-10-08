import React, { useEffect, useState } from 'react';
import './index.less';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { editorH5ToNormal } from '@/common/utils';
import { maxContentLength } from '@/util/const';

interface WangEditorProps {
  h5Content: string;
  onChange:(editor:IDomEditor)=>void
}

const WangEditor: React.FC<WangEditorProps> = (props) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // 编辑器内容
  const [html, setHtml] = useState('');
  const [htmlLength, setHtmlLength] = useState(0);
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      /* 隐藏哪些菜单 */
      'insertLink',
      'group-image',
      'group-video',
    ],
  }; // TS 语法
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: '请输入内容...',
  };
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  useEffect(() => {
    setHtml(props.h5Content);
  }, [props.h5Content]);

  const onChangeEditor = (editor: IDomEditor) => {
    setHtml(editor.getHtml());
    const htmlLength = editorH5ToNormal(editor.getHtml()).length;
    setHtmlLength(htmlLength);
    props.onChange(editor)
  };
  return (
    <div className="page-editor">
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(e) => onChangeEditor(e)}
          mode="default"
          style={{ maxHeight: '800px', overflowY: 'scroll' }}
        />
      </div>
      {htmlLength > maxContentLength ? (
        <div className="htmlLength c-r">{`${htmlLength}/${maxContentLength}`}</div>
      ) : (
        <div className="htmlLength">{`${htmlLength}/${maxContentLength}`}</div>
      )}
    </div>
  );
};
export default WangEditor;
