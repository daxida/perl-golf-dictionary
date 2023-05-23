"use strict";

let jsonData = []; 
fetch('entries.json')
  .then(response => response.json())
  .then(data => { 
    jsonData = data;
  })
  .catch(error => {
    console.error('Error:', error);
});

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
  // JSON to html

  return jsonData.map((entry) => {
    const hasExamples = (entry.examples.length > 0);

    let entry_html = `
<table id="filter-${entry.idx}" class="filter-aaa" border="5">
  <tr>
    <td class="code code-x" id="code-${entry.idx}"><xmp>${entry.code}</xmp></td>
    <td class="description">${entry.description}</td>
    <td class="${hasExamples ? "example" : "example-hide"}">
      <button onclick="[...document.getElementsByClassName('${entry.idx}')].map(d=>d.classList.toggle('show'));">Examples</button>
    </td>
  </tr>
</table>
`;
    
    if (!hasExamples) return entry_html;
    
    
    let example_dropdown = entry.examples.map((example) => {
      let links = "";
      if (example.links.length > 0) {
        links = example.links
          .map((link) => `<a href="${link}">${link}</a>`)
          .join("<br>");
      }

      if (!example.stdin) example.stdin = "None";
    
      let example_html = `
<tr class="tr-example">
  <tr>
    <td colspan="2" class="snippet" id="code-${entry.idx}">
      <table>
        <tr>
          <td>${links}</td>
        </tr>
        <tr>
          <td class="code-x"><code>${example.code}</code></td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <td class="snippet-input">${example.stdin}</td>
        </tr>
        <tr>
          <td class="snippet-output">${example.stdout}</td>
        </tr>
      </table>
    </td>
  </tr>
</tr>`

      return example_html;
    }).join("\n"); 

    entry_html += `<table id="filter-${entry.idx}" class="table-example dropdown ${entry.idx}">${example_dropdown}</table>`;
    console.log("NEW", entry_html)

    return entry_html;
  }).join("\n");
}

async function code_mirror_rep() {
   [...document.getElementsByClassName("code-x")]
     .sort((a, b) => a.id.split("-")[1] - b.id.split("-")[1])
     .map(elem => { CodeMirror.runMode(elem.innerText, "text/x-perl", elem) });
}

async function file_parse() {
  // Parses QUERY into CODE_ARR

  const QUERY_ARR = QUERY.split("\n***\n");
// console.log(QUERY_ARR);
  CODE_ARR = QUERY_ARR.map((query, ind) => {
    // console.log(query);
    const [code, desc_pre] = query.split("\n---\n");
    const [desc, ...example_str_arr] = desc_pre.split("\niii\n");
    let example_arr = example_str_arr.map(example_str => {
      const [stdin, code, stdout] = example_str.split(/\n?(?:ccc|ooo)\n/g); 
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
    
    let ret = [ind, code, desc];
    if (example_arr.length > 0) ret.push(example_arr);

    return ret;
  });

  // console.log("code arr ", CODE_ARR);
  main(CODE_ARR);
}

async function main(code_arr) {
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

async function file_wait() {
  let FILE_READ_LOOP = setInterval(function() {
    if (QUERY === null) return;

    clearInterval(FILE_READ_LOOP);
    file_parse();
  }, 10);
}

$(document).ready(() => {
  file_wait();

  $("#QUERY").on("keyup", (e) => {
    // console.log("huh");
    if (e.keyCode != 13) {
      return;
    }
    // console.log("HI");
    let query = $("#QUERY").val();
    // console.log("query", '[' + query + ']');
    // console.log("HI ", CODE_ARR);

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
      $(".filter-aaa").hide();

      $(".table-example").map((_i, query_example_tab) => {
        query_example_tab.style.display = "table";

        // console.log(_i, query_example_tab)
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
          if (query_match) query_example_tab.style.display = "table";
        }
      });
    }
  });
});
