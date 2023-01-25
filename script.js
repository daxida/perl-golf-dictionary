"use strict";

const READER = new XMLHttpRequest() || new ActiveXObject("MSXML2.XMLHTTP");
let QUERY = null;
let CODE_ARR = null;

file_read("perl_query.pl");

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
  return code_arr.map(x => {
    const [i, code, description, example_arr] = x;
    let z = `
<table id = "filter-${i}" class = "filter-aaa" border="5">
<tr>
  <td class="code code-x" id = "code-${ind}"><xmp>${code}</xmp></td>
  <td class="description">${description}</td>
  <td class="${typeof example_arr === 'undefined' ? "example-hide" : "example"}">
    <button onclick="[...document.getElementsByClassName('${i}')].map(d=>d.classList.toggle('show'));">Examples</button>
  </td>
</tr>
</table>
`;
    ind += 1;
    let example_dropdown = ""
    if (typeof example_arr !== "undefined") {
      example_dropdown = example_arr.map(e => {
        let stdin = "";
        let c = "";
        let stdout = "";
        // console.log(e);
        if (e.length == 3) {
          [stdin, c, stdout] = e;
          stdin = `<td class="snippet">${stdin}</td>`;
          stdout = `<td class="snippet">${stdout}</td>`
        } else if (e.length == 2) {
          // stdin = "";
          [c, stdout] = e;
          stdout = `<td class="snippet">${stdout}</td>`
        } else {
          [c] = e;
        }

        // c = c.replaceAll("🦋", "");
        let n = `<tr class="tr-example">
  ${stdin}
  <td class="snippet code-x" id = "code-${ind}"><xmp>${c}</xmp></td>
  ${stdout}
</tr>`;
        ind += 1;
        return n;
      }).join("\n");
    }

    z += `<table id = "filter-${i}" class="table-example dropdown ${i}">${example_dropdown}</table>`;

    return z;

  }).join("\n")
}

async function code_mirror_rep() {
   [...document.getElementsByClassName("code-x")].sort((a, b) => a.id.split("-")[1] - b.id.split("-")[1]).map(elem => { 
     CodeMirror.runMode(elem.innerText, "text/x-perl", elem)
   });
}

async function file_parse() {
  const QUERY_ARR = QUERY.split("\n***\n");
// console.log(QUERY_ARR);
  CODE_ARR = QUERY_ARR.map((query, ind) => {
    console.log(query);
    let [code, desc_pre] = query.split("\n---\n");
    let [desc, ...example_str_arr] = desc_pre.split("\niii\n");
    let example_arr = example_str_arr.map(example_str => {let [stdin, code, stdout] = example_str.split(/\n?(?:ccc|ooo)\n/g); 

      console.log("stdout", stdout);
      let arr = [];
      if (stdin !== "") {
        arr.push(stdin);
      }

      arr.push(code);
      
      if (typeof stdout !== "undefined") {
        arr.push(stdout);
      }

      return arr;
    });
    return example_arr.length == 0 ? [ind, code, desc] : [ind, code, desc, example_arr];
  });

  console.log("code arr ", CODE_ARR);
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
}

function toggle_search() {
  console.log($(".toggle-search-button").text());
  if ($(".toggle-search-button").text() === "Entry") {
    $(".toggle-search-button").text("Example");
  } else {
    $(".toggle-search-button").text("Entry");
  }
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
    console.log("query", '[' + query + ']');
    console.log("HI ", CODE_ARR);

    $(".dropdown").map((_i, drop) => {
      drop.classList.remove("show");
    });

    if ($(".toggle-search-button").text() === "Entry") {
      $(".table-example").map((_i, query_example_tab) => {
        if (query_example_tab.children.length > 0) {
          let query_example = query_example_tab.children[0].children;
          for (let i = 0; i < query_example.length; i++) {
              query_example[i].style.display = "table-row";
          }

        }
        query_example_tab.classList.remove("show");
        query_example_tab.style.display = "";
      });

      $(".filter-aaa").map((_i, query_entry) => {
        // console.log("entry ", query_entry.children[0].children[0].children[0].children[0]);
        // let re_raw = new RegExp(String.raw`${query}`);
        // let re = new RegExp(query);
        // let re_raw_arr = query.split(" ").map(q => new RegExp(String.raw`${q}`));
        // let re_arr = query.split(" ").map(q => new RegExp(q));
        let query_check = query_entry.children[0].children[0];
        let [code, description, _] = [...query_check.children].map(qe => qe.innerText);

        if (code.includes(query) || description.includes(query)) {
        // if (re.test(code) || re_raw.test(code) || re.test(description) || re.test(description) || re_raw_arr.some(r => r.test(code) || r.test(description)) || re_arr.some(r => r.test(code) || r.test(description))) {
          query_entry.style.display = "table";
        } else {
          query_entry.style.display = "none";
        }
      })

    } else {
      $(".filter-aaa").map((_i, query_entry) => {
        query_entry.style.display = "none";
      });

      $(".table-example").map((_i, query_example_tab) => {
        if (query_example_tab.children.length > 0) {
          let query_example = query_example_tab.children[0].children;
          // console.log("what ", children);
          let query_match = 0;
          for(let i = 0; i < query_example.length; i++){

            if (query_example[i].innerText.includes(query)) {
              query_match += 1;
              query_example[i].style.display = "table-row";
            } else {
              query_example[i].style.display = "none";
            }
          }

          if (query_match) {
            query_example_tab.style.display = "table";
          } else {

            query_example_tab.style.display = "none";
          }
        } else {
          query_example_tab.style.display = "none";
        }
      });
    }
  });
});
