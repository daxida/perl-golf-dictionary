"use strict";

const READER = new XMLHttpRequest() || new ActiveXObject("MSXML2.XMLHTTP");
let QUERY = null;
let CODE_ARR = null;

file_read("perl_query.txt");

async function file_read(file) {
    READER.open("get", file, true); 
    READER.onreadystatechange = () => {
      if (READER.readyState == 4) {
        QUERY = READER.responseText; 
      }
    };
    READER.send(null);
}


async function code_arr_text(code_arr) {
  let ind = 0;
  return code_arr.map((x, i) => {
    const [code, description, example_arr] = x;
    let z = `
    <table border="5">
    <tr>
  <td style="width:60vh" class="code-x" id = "code-${ind}">${code}</td>
  <textarea class="code" id = "code-${ind}">${code}</textarea>
  <td style="width:35vh">${description}</td>
  <td style="width:5vh">
    <button onclick="[...document.getElementsByClassName('${i}')].map(d=>d.classList.toggle('show'));">Examples</button>
  </td>
</tr>
</table>
`;
    ind += 1;
    let example_dropdown = ""
    if (typeof example_arr === "undefined") {
      z = z.replace(`    <button onclick="[...document.getElementsByClassName('${i}')].map(d=>d.classList.toggle('show'));">Examples</button>`, "")
    } else {
      example_dropdown = example_arr.map(e => {
        let stdin = "";
        let c = "";
        let stdout = "";
        // console.log(e);
        if (e.length == 3) {
          [stdin, c, stdout] = e;
          stdin = `<td class="snippet">${stdin}</td>`;
        } else {
          stdin = "";
          [c, stdout] = e;
        }
        let n = `<tr class="tr-example">
    <textarea class="code" id = "code-${ind}">${c}</textarea>${stdin}<td class="snippet code-x" id = "code-${ind}">${c}</td><td class="snippet">${stdout}</td>
  </tr>`;
        ind += 1;
        return n;
      }).join("\n");
    }

    z += `<table class="table-example dropdown ${i}">${example_dropdown}</table>`;

    return z;

  }).join("\n")
}

async function code_mirror_rep() {
  // console.log([...document.getElementsByClassName("code")]);
  [...document.getElementsByClassName("code")].sort((a, b) => a.id.split("-")[1] - b.id.split("-")[1]).map(elem => {
    console.log("eleme there", elem);
    let editor = CodeMirror.fromTextArea(elem, {}, elem.id);
    console.log(editor.chicken);
  })
}

async function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

async function syntax_rep() {
  SYNTAX_LOOP = setInterval(function() {
    if (!document.getElementsByClassName("code")) {
      return;
    }


    let code_x_elem_arr = [...document.getElementsByClassName("code-x")];
    let code_ind = 0;
    console.log("builder big is what", BUILDER_BIG);
    // let span_string = BUILDER_BIG.map((builder_line) => {
    Object.keys(BUILDER_BIG).forEach(function (builder_id) { 
      let code_elem_arr = [...BUILDER_BIG[builder_id].children];
      let code_text = code_elem_arr.map(ce => [...ce.childNodes][0].innerHTML).join("\n");
      code_x_elem_arr.find(cx => cx.id == builder_id).innerHTML = code_text;
    })
    let a = [...document.getElementsByClassName("CodeMirror")]
    a.map(x => x.remove());

    clearInterval(SYNTAX_LOOP);
    BUILDER_BIG = {};
  }, 10);
}


async function file_parse() {
  const QUERY_ARR = QUERY.split("\n***\n");
// console.log(QUERY_ARR);
  const CODE_ARR = QUERY_ARR.map(query => {
    console.log(query);
    let [code, desc_pre] = query.split("\n---\n");
    let [desc, ...example_str_arr] = desc_pre.split("\niii\n");
    let example_arr = example_str_arr.map(example_str => {let [stdin, code, stdout] = example_str.split(/\n?(?:ccc|ooo)\n/g); 
      if (stdin === "") {
        return [code, stdout];
      } else {
        return [stdin, code, stdout];
      }
    });
    return example_arr.length == 0 ? [code, desc] :[code, desc, example_arr];
  });

  console.log(CODE_ARR);
  main(CODE_ARR);
}
async function file_wait() {
  let FILE_READ_LOOP = setInterval(function() {
    if (QUERY === null) {
      return;
    }

    clearInterval(FILE_READ_LOOP);
    file_parse();
  }, 10);

}

async function main(code_arr) {
  // IND = 0;
  let a = await code_arr_text(code_arr);
  // console.log(a);
  await $("#TABLE").html(a);
  await code_mirror_rep();
  await syntax_rep();
}

$(document).ready(() => {
  file_wait();

  $("#QUERY").on("keyup", (e) => {
    console.log("huh");
    if (e.keyCode != 13) {
      return;
    }
    // console.log("HI");
    let query = $("#QUERY").val();
    console.log("HI");


    main(CODE_ARR.filter(x => {
      [code, description, example_arr] = x;

      let raw_re = new RegExp(String.raw`${query}`);
      let re = new RegExp(query);
      return re.test(code) || raw_re.test(code)
        || re.test(description) || raw_re.test(description)
    }));
  });
});