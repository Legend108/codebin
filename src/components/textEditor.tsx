import brace from "brace";
import "brace/mode/javascript";
import "brace/mode/c_cpp";
import "brace/theme/twilight";
import "brace/theme/xcode";
import AceEditor from "react-ace";

const textEditor = (props: any) => (
  <div>
    <AceEditor
      mode={props.lan}
      theme={props.theme}
      onChange={props.onChange}
      name="editor"
      editorProps={{
        $blockScrolling: true,
      }}
      fontSize={21}
      height="80vh"
      width="100%"
    />
  </div>
);

export default textEditor;
