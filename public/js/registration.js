var counter = 1;
var limit = 3;

function addInput(divName) {
  if (counter >> limit) {
    alert("You have reached the limit of adding " + counter + " inputs");
  } else {
    var newdiv = document.createElement("div");
    newdiv.innerHTML =
      "Entry " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
    document.getElementById(divName).appendChild(newdiv);
    counter++;
  }
}

var fileId = 0; // used by the addFile() function to keep track of IDs
function addFile() {
  fileId++; // increment fileId to get a unique ID for the new element
  if (fileId > limit) {
    console.log("limit cross");
  } else {
    var html =
      '<div class="form-group">' +
      '<input type="number" class="form-control mobileInputCls" placeholder="Mobile" name="mobile' +
      fileId +
      '" id="mobile' + fileId + '" aria-label="Recipients username" aria-describedby="button - addon2">' +
      "</div>" +
      '<p style="color: red;" id="mobile' + fileId + 'err"></p>';

    addElement("files", "div", "mobile-" + fileId, html);
  }
}

function addElement(parentId, elementTag, elementId, html) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.classList.add("col-md-6");
  //newElement.setAttribute("id", elementId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
}

var emailId = 0; // used by the addFile() function to keep track of IDs
function addEmail() {
  emailId++; // increment fileId to get a unique ID for the new element
  if (emailId > limit) {
    console.log("limit cross");
  } else {
    var html =
      '<div class="form-group">' +
      '<input type="text" class="form-control" placeholder="Email" name="email' +
      emailId +
      '" id="email' + emailId + '"  aria-label="Recipients username" aria-describedby="button - addon2">' +
      "</div>" +
      '<p style="color: red;" id="email' + emailId + 'err"></p>';
    addElement("emails", "div", "email-" + emailId, html);
  }
}

function addEmailElement(parentId, elementTag, elementId, html) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.classList.add("col-md-6");
  newElement.setAttribute("id", elementId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
}

var companyID = 1; // used by the addFile() function to keep track of IDs
function addCompany() {
  companyID++; // increment fileId to get a unique ID for the new element
  if (companyID == limit) {
    console.log("limit cross");
  } else {
    console.log(companyID);
    var html =
      `<div class="row ">
                                        <div class="col-md-12 ">
                                            <div class="form-group ">
                                                <label>Company Name</label>
                                                <input type="organization-title" name="company` +
      companyID +
      `" class="form-control"
                                                    placeholder="Company Name" autocomplete="on">
                                            </div>
                                        </div>

                                    </div>
                                    <hr>
                                    <div class="row ">
                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label>Company Industry</label>
                                                <select class="form-control select2" name="companyIndustry` +
      companyID +
      `"  id="companyIndustry` +
      companyID +
      `" style="width: 100%; ">
                                                    <option selected="selected">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label for="Reference ">Role</label>
                                                <select class="form-control select2" name="companyRole` +
      companyID +
      `" id="companyRole` +
      companyID +
      `" style="width: 100%;">
                                                    <option selected="selected ">Select</option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row ">
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label for="Reference ">Start year</label>
                                                <input type="date" id="birthday " name="startDate` +
      companyID +
      `"
                                                    class="form-control ">
                                            </div>
                                        </div>
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label for="Reference">End year</label>
                                                <input type="date" id="birthday " name="endDate` +
      companyID +
      `"
                                                    class="form-control ">
                                            </div>
                                        </div>
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label>Salary</label>
                                                <input type="type" class="form-control"  name="salary` +
      companyID +
      `" style="width: 100%;">
                                                    
                                            </div>
                                        </div>
                                    </div>
                                    <hr>`;

    addCompanyElement("company", "div", "company-" + companyID, html,
      "#companyIndustry" + companyID, "#companyRole" + companyID, companyID);
    return companyID;
  }
}

function addCompanyElement(parentId, elementTag, elementId, html, companyIndustry, companyRole, id) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute("id", elementId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
  console.log(p);
  getUserList(companyIndustry, companyRole, "company", id);

}


var companyIDs = 1; // used by the addFile() function to keep track of IDs
function addCompanys() {
  companyIDs++; // increment fileId to get a unique ID for the new element
  if (companyIDs == limit) {
    console.log("limit cross");
  } else {
    console.log(companyIDs);
    var html =
      `<div class="row ">
                                        <div class="col-md-12 ">
                                            <div class="form-group ">
                                                <label>Company Name</label>
                                                <input type="organization-title" name="company` +
      companyIDs +
      `" class="form-control"
                                                    placeholder="Company Name" autocomplete="on">
                                            </div>
                                        </div>

                                    </div>
                                    <hr>
                                    <div class="row ">
                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label>Company Industry</label>
                                                <select class="form-control select2" name="companyIndustry` +
      companyIDs +
      `"  id="companyIndustry` +
      companyIDs +
      `" style="width: 100%; ">
                                                    <option selected="selected">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label for="Reference ">Role</label>
                                                <select class="form-control select2" name="companyRole` +
      companyIDs +
      `" id="companyRole` +
      companyIDs +
      `" style="width: 100%;">
                                                    <option selected="selected ">Select</option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row ">
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label for="Reference ">Start year</label>
                                                <input type="date" id="birthday " name="startDate` +
      companyIDs +
      `"
                                                    class="form-control ">
                                            </div>
                                        </div>
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label for="Reference">End year</label>
                                                <input type="date" id="birthday " name="endDate` +
      companyIDs +
      `"
                                                    class="form-control ">
                                            </div>
                                        </div>
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label>Salary</label>
                                                <input type="type" class="form-control"  name="salary` +
      companyIDs +
      `" style="width: 100%;">
                                                    
                                            </div>
                                        </div>
                                    </div>
                                    <hr>`;

    addCompanyElements("companys", "div", "company-" + companyIDs, html,
      "#companyIndustry" + companyIDs, "#companyRole" + companyIDs, companyIDs);
    return companyIDs;
  }
}

function addCompanyElements(parentId, elementTag, elementId, html, companyIndustry, companyRole, id) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute("id", elementId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
  document.getElementById("companyCount").value = id;
  console.log(p);
  getUserList(companyIndustry, companyRole, "company", id);

}

var preferenceID = 1; // used by the addFile() function to keep track of IDs
function addPreferences() {
  console.log(preferenceID);
  preferenceID++; // increment fileId to get a unique ID for the new element

  if (preferenceID == limit) {
    console.log("limit cross");
  } else {
    console.log("Prefernces..............", preferenceID);
    var html =
      `<div class="row">
                                        <div class="col-md-6 ">
                                            <div class="form-group">
                                                <label>Prefered Industry</label>
                                                <select class="form-control select2" style="width: 100%;"
                                                name="preferedIndustry` +
      preferenceID +
      `" id="preferedIndustry` +
      preferenceID +
      `">
                                                    <option selected="selected">Select</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label>Prefered Job Role</label>
                                                <select class="form-control select2" style="width: 100%;"
                                                name="preferedIndustryJobRole` +
      preferenceID +
      `" id="preferedIndustryJobRole` +
      preferenceID +
      `">
                                                    <option selected="selected">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>`;

    addPreferenceElement(
      "prefer",
      "div",
      "preference-" + preferenceID,
      html,
      "#preferedIndustry" + preferenceID,
      "#preferedIndustryJobRole" + preferenceID,
      preferenceID
    );
  }
}

function addPreferenceElement(parentId, elementTag, elementId, html, industry, industryJob, id) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute("id", elementId);
  document.getElementById("preferenceCount").value = id;
  newElement.innerHTML = html;
  p.appendChild(newElement);
  console.log(p);
  getUserList(industry, industryJob, "preference", id);
}

function getUserList(industryRole, industryJob, type, count) {
  $(document).ready(function () {
    // $("#recruiterType").on("change", function (event) {
    //event.preventDefault();

    $.ajax({
      type: "GET",
      url: "/ajax/preferedJob/",
      success: function (res) {
        var role = res.preferedRole.length;
        var industry = res.preferedIndustry.length;

        //$("#preferedIndustryJobRole"+elementId).empty();
        for (var i = 0; i < role; i++) {
          var id = res.preferedRole[i];
          $(industryJob).append("<option value='" + id + "'>" + id + "</option>");
        }

        //$("#preferedIndustry" + elementId).empty();
        for (var i = 0; i < industry; i++) {
          var id = res.preferedIndustry[i];
          $(industryRole).append(
            "<option value='" + id + "'>" + id + "</option>"
          );
        }

        if (type !== undefined && type === "preference") {
          $("#preferenceCount").val(count);
        }

        if (type !== undefined && type === "company") {
          $("#companyCount").val(count);
        }
      },
    });
  });
}

//Multiple step Form



var languageId = 0; // used by the addFile() function to keep track of IDs
function addLanguage() {
  languageId++; // increment fileId to get a unique ID for the new element
  var access = document.getElementById('accountAccess').value;
  var html;
  if (access === 'L1_ASSESSMENT') {
    html = `                <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Language</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "language`+ languageId + `"
                                            id = "language`+ languageId + `">
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>L1 Level</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "onelevel`+ languageId + `"
                                            id = "onelevel`+ languageId + `" >
                                            <option value="-1" selected>--Select--</option>
                                            <option value="0 to 2">0 to 2</option>
                                            <option value="2 to 4">2 to 4</option>
                                            <option value="4 to 5">4 to 5</option>
                                            <option value="5 to 6">5 to 6</option>
                                            <option value="6+">6+</option>
                                        </select>
                                    </div>
                                </div>
                              </div>  
    `;
  }
  else {
    html = `              <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Language</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "language` + languageId + `"
                                            id = "language` + languageId + `">
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>L1 Level</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "onelevel` + languageId + `"
                                            id = "onelevel` + languageId + `" >
                                            <option value="-1" selected>--Select--</option>
                                            <option value="0 to 2">0 to 2</option>
                                            <option value="2 to 4">2 to 4</option>
                                            <option value="4 to 5">4 to 5</option>
                                            <option value="5 to 6">5 to 6</option>
                                            <option value="6+">6+</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>L2 Level</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "twolevel`+ languageId + `"
                                            id = "twolevel`+ languageId + `" >
                                            <option value="-1" selected>--Select--</option>
                                            <option value="0 to 2">0 to 2</option>
                                            <option value="2 to 4">2 to 4</option>
                                            <option value="4 to 5">4 to 5</option>
                                            <option value="5 to 6">5 to 6</option>
                                            <option value="6+">6+</option>
                                        </select>
                                    </div>
                                </div>
                              </div>

    `;
  }
  addLanguageElement("languageComponent", "div", html, languageId);
  return languageId;

}

function addLanguageElement(parentId, elementTag, html, languageId) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute("id", languageId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
  console.log(p);
  getLanguageList(languageId);
}

function getLanguageList(count) {
  //$(document).ready(function () {
  // $("#recruiterType").on("change", function (event) {
  //event.preventDefault();

  $.ajax({
    type: "GET",
    url: "/ajax/getLanguage/",
    success: function (res) {
      var role = res.languageList.length;

      $("#language" + count).empty();
      for (var i = 0; i < role; i++) {
        var id = res.languageList[i].id;
        var name = res.languageList[i].name;
        $("#language" + count).append("<option value='" + id + "'>" + name + "</option>");
      }

      if (count) {
        $("#languageCount").val(count);
      }


    },
  });
  //});
}

var langCount = 0;
function addEditLanguage(languageIds) {
  var languageId = +languageIds;
  console.log(languageId);
  languageId--;
  if (langCount == languageId && langCount != 0) {
    languageId++;
    langCount = languageId;
  }
  else if (languageId == 0) {
    languageId = languageId + 2;
    langCount = languageId;
  }
  else
    langCount = languageId;
  // increment fileId to get a unique ID for the new element
  console.log("Language_Count", languageId);
  var access = document.getElementById('accountAccess').value;
  console.log(access);
  var html;
  if (access === 'L1_ASSESSMENT') {
    html = `                <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Language</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "language` + languageId + `"
                                            id = "language` + languageId + `">
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>L1 Level</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "onelevel` + languageId + `"
                                            id = "onelevel` + languageId + `" >
                                            <option value="-1" selected>--Select--</option>
                                            <option value="0 to 2">0 to 2</option>
                                            <option value="2 to 4">2 to 4</option>
                                            <option value="4 to 5">4 to 5</option>
                                            <option value="5 to 6">5 to 6</option>
                                            <option value="6+">6+</option>
                                        </select>
                                    </div>
                                </div>
                              </div>  
    `;
  } else {
    html = `              <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Language</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "language` + languageId + `"
                                            id = "language` + languageId + `">
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>L1 Level</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "onelevel` + languageId + `"
                                            id = "onelevel` + languageId + `" >
                                            <option value="-1" selected>--Select--</option>
                                            <option value="0 to 2">0 to 2</option>
                                            <option value="2 to 4">2 to 4</option>
                                            <option value="4 to 5">4 to 5</option>
                                            <option value="5 to 6">5 to 6</option>
                                            <option value="6+">6+</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>L2 Level</label>
                                        <select class="form-control select2" required style="width: 100%;"
                                            name = "twolevel` + languageId + `"
                                            id = "twolevel` + languageId + `" >
                                            <option value="-1" selected>--Select--</option>
                                            <option value="0 to 2">0 to 2</option>
                                            <option value="2 to 4">2 to 4</option>
                                            <option value="4 to 5">4 to 5</option>
                                            <option value="5 to 6">5 to 6</option>
                                            <option value="6+">6+</option>
                                        </select>
                                    </div>
                                </div>
                              </div>

    `;
  }
  addLanguageElement("languageComponent", "div", html, languageId);
  return languageId;

}


var institute = 1;
function addInstitute() {
  institute++;
  var html = `                                     <hr>         <div class="row ">
                                                                <div class="col-md-12 ">
                                                                    <div class="form-group ">
                                                                        <label>POC Name</label>
                                                                        <input type="text " class="form-control " id="poc_name`+ institute + `" name="poc_name` + institute +`" placeholder="POC Name">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                            <div class="row ">
                                                                <div class="col-md-12 ">
                                                                    <div class="form-group ">
                                                                        <label>Designation</label>
                                                                        <input type="text " class="form-control " id="designation`+ institute + `" name="designation` + institute +`" placeholder="Designation">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="row ">
                                                                <div class="col-md-6 ">
                                                                    <div class="form-group ">
                                                                        <label>Email</label>
                                                                        <input type="text " class="form-control " id="email`+ institute + `" name="email` + institute +`" placeholder="Email">
                                                        
                                                                    </div>
                                                                </div>
                                                        
                                                                <div class="col-md-6 ">
                                                                    <div class="form-group ">
                                                                        <label>Mobile</label>
                                                                        <input type="text " class="form-control " id="mobile`+ institute + `" name="mobile` + institute +`" placeholder="Mobile">
                                                        
                                                                    </div>
                                                                </div>
                                                            </div> `;
  addInstitueElement("source", "div", html, institute);
  return institute;

}

function updateInstitute() {
  institute = document.getElementById("instituteCount").value;
  institute++;

  var html = `                                     <hr>         <div class="row ">
                                                                <div class="col-md-12 ">
                                                                    <div class="form-group ">
                                                                        <label>POC Name</label>
                                                                        <input type="text " class="form-control " id="poc_name`+ institute + `" name="poc_name` + institute + `" placeholder="POC Name">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                            <div class="row ">
                                                                <div class="col-md-12 ">
                                                                    <div class="form-group ">
                                                                        <label>Designation</label>
                                                                        <input type="text " class="form-control " id="designation`+ institute + `" name="designation` + institute + `" placeholder="Designation">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="row ">
                                                                <div class="col-md-6 ">
                                                                    <div class="form-group ">
                                                                        <label>Email</label>
                                                                        <input type="text " class="form-control " id="email`+ institute + `" name="email` + institute + `" placeholder="Email">
                                                        
                                                                    </div>
                                                                </div>
                                                        
                                                                <div class="col-md-6 ">
                                                                    <div class="form-group ">
                                                                        <label>Mobile</label>
                                                                        <input type="text " class="form-control " id="mobile`+ institute + `" name="mobile` + institute + `" placeholder="Mobile">
                                                        
                                                                    </div>
                                                                </div>
                                                            </div> `;
  addInstitueElement("source", "div", html, institute);
  return institute;

}


function addInstitueElement(parentId, elementTag, html, instituteId) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute("id", instituteId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
  document.getElementById("instituteCount").value = instituteId;

}













// Input Tag autocomplete
$(document).ready(function () {
  $(".js-example-basic-multiple").select2();
});

// Empty Tag Code
[].forEach.call(document.getElementsByClassName("tags-input"), function (el) {
  let hiddenInput = document.createElement("input"),
    mainInput = document.createElement("input"),
    tags = [];

  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", el.getAttribute("data-name"));

  mainInput.setAttribute("type", "text");
  mainInput.classList.add("main-input");
  mainInput.addEventListener("input", function () {
    let enteredTags = mainInput.value.split(",");
    if (enteredTags.length > 1) {
      enteredTags.forEach(function (t) {
        let filteredTag = filterTag(t);
        if (filteredTag.length > 0) addTag(filteredTag);
      });
      mainInput.value = "";
    }
  });

  mainInput.addEventListener("keydown", function (e) {
    let keyCode = e.which || e.keyCode;
    if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  });

  el.appendChild(mainInput);
  el.appendChild(hiddenInput);

  addTag("hello!");

  function addTag(text) {
    let tag = {
      text: text,
      element: document.createElement("span"),
    };

    tag.element.classList.add("tag");
    tag.element.textContent = tag.text;

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.addEventListener("click", function () {
      removeTag(tags.indexOf(tag));
    });
    tag.element.appendChild(closeBtn);

    tags.push(tag);

    el.insertBefore(tag.element, mainInput);

    refreshTags();
  }

  function removeTag(index) {
    let tag = tags[index];
    tags.splice(index, 1);
    el.removeChild(tag.element);
    refreshTags();
  }

  function refreshTags() {
    let tagsList = [];
    tags.forEach(function (t) {
      tagsList.push(t.text);
    });
    hiddenInput.value = tagsList.join(",");
  }

  function filterTag(tag) {
    return tag
      .replace(/[^\w -]/g, "")
      .trim()
      .replace(/\W+/g, "-");
  }
});


// Tag
$(function () {
  $("#form-tags-1").tagsInput();

  $("#form-tags-2").tagsInput({
    onAddTag: function (input, value) {
      console.log("tag added", input, value);
    },
    onRemoveTag: function (input, value) {
      console.log("tag removed", input, value);
    },
    onChange: function (input, value) {
      console.log("change triggered", input, value);
    },
  });

  $("#form-tags-3").tagsInput({
    unique: true,
    minChars: 1,
    maxChars: 1000,
    limit: 1000,
    validationPattern: new RegExp(".*")
    // validationPattern: new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$"),
  });
  //^[a-zA-Z]+$

  $("#form-tags-4").tagsInput({
    autocomplete: {
      source: ["apple", "banana", "orange", "pizza"],
    },
  });

  $("#form-tags-5").tagsInput({
    delimiter: ";",
  });

  $("#form-tags-6").tagsInput({
    delimiter: [",", ";"],
  });
});

/* jQuery Tags Input Revisited Plugin
 *
 * Copyright (c) Krzysztof Rusnarczyk
 * Licensed under the MIT license */

(function ($) {
  var delimiter = [];
  var inputSettings = [];
  var callbacks = [];

  $.fn.addTag = function (value, options) {
    options = jQuery.extend(
      {
        focus: false,
        callback: true,
      },
      options
    );

    this.each(function () {
      var id = $(this).attr("id");

      var tagslist = $(this).val().split(_getDelimiter(delimiter[id]));
      if (tagslist[0] === "") tagslist = [];

      value = jQuery.trim(value);

      if (
        (inputSettings[id].unique && $(this).tagExist(value)) ||
        !_validateTag(value, inputSettings[id], tagslist, delimiter[id])
      ) {
        $("#" + id + "_tag").addClass("error");
        return false;
      }

      $("<span>", { class: "tag" })
        .append(
          $("<span>", { class: "tag-text" }).text(value),
          $("<button>", { class: "tag-remove" }).click(function () {
            return $("#" + id).removeTag(encodeURI(value));
          })
        )
        .insertBefore("#" + id + "_addTag");

      tagslist.push(value);

      $("#" + id + "_tag").val("");
      if (options.focus) {
        $("#" + id + "_tag").focus();
      } else {
        $("#" + id + "_tag").blur();
      }

      $.fn.tagsInput.updateTagsField(this, tagslist);

      if (options.callback && callbacks[id] && callbacks[id]["onAddTag"]) {
        var f = callbacks[id]["onAddTag"];
        f.call(this, this, value);
      }

      if (callbacks[id] && callbacks[id]["onChange"]) {
        var i = tagslist.length;
        var f = callbacks[id]["onChange"];
        f.call(this, this, value);
      }
    });

    return false;
  };

  $.fn.removeTag = function (value) {
    value = decodeURI(value);

    this.each(function () {
      var id = $(this).attr("id");

      var old = $(this).val().split(_getDelimiter(delimiter[id]));

      $("#" + id + "_tagsinput .tag").remove();

      var str = "";
      for (i = 0; i < old.length; ++i) {
        if (old[i] != value) {
          str = str + _getDelimiter(delimiter[id]) + old[i];
        }
      }

      $.fn.tagsInput.importTags(this, str);

      if (callbacks[id] && callbacks[id]["onRemoveTag"]) {
        var f = callbacks[id]["onRemoveTag"];
        f.call(this, this, value);
      }
    });

    return false;
  };

  $.fn.tagExist = function (val) {
    var id = $(this).attr("id");
    var tagslist = $(this).val().split(_getDelimiter(delimiter[id]));
    return jQuery.inArray(val, tagslist) >= 0;
  };

  $.fn.importTags = function (str) {
    var id = $(this).attr("id");
    $("#" + id + "_tagsinput .tag").remove();
    $.fn.tagsInput.importTags(this, str);
  };

  $.fn.tagsInput = function (options) {
    var settings = jQuery.extend(
      {
        interactive: true,
        placeholder: "Add a tag",
        minChars: 0,
        maxChars: null,
        limit: null,
        validationPattern: null,
        width: "auto",
        height: "auto",
        autocomplete: null,
        hide: true,
        delimiter: ",",
        unique: true,
        removeWithBackspace: true,
      },
      options
    );

    var uniqueIdCounter = 0;

    this.each(function () {
      if (typeof $(this).data("tagsinput-init") !== "undefined") return;

      $(this).data("tagsinput-init", true);

      if (settings.hide) $(this).hide();

      var id = $(this).attr("id");
      if (!id || _getDelimiter(delimiter[$(this).attr("id")])) {
        id = $(this)
          .attr("id", "tags" + new Date().getTime() + ++uniqueIdCounter)
          .attr("id");
      }

      var data = jQuery.extend(
        {
          pid: id,
          real_input: "#" + id,
          holder: "#" + id + "_tagsinput",
          input_wrapper: "#" + id + "_addTag",
          fake_input: "#" + id + "_tag",
        },
        settings
      );

      delimiter[id] = data.delimiter;
      inputSettings[id] = {
        minChars: settings.minChars,
        maxChars: settings.maxChars,
        limit: settings.limit,
        validationPattern: settings.validationPattern,
        unique: settings.unique,
      };

      if (settings.onAddTag || settings.onRemoveTag || settings.onChange) {
        callbacks[id] = [];
        callbacks[id]["onAddTag"] = settings.onAddTag;
        callbacks[id]["onRemoveTag"] = settings.onRemoveTag;
        callbacks[id]["onChange"] = settings.onChange;
      }

      var markup = $("<div>", {
        id: id + "_tagsinput",
        class: "tagsinput",
      }).append(
        $("<div>", { id: id + "_addTag" }).append(
          settings.interactive
            ? $("<input>", {
              id: id + "_tag",
              class: "tag-input",
              value: "",
              placeholder: settings.placeholder,
            })
            : null
        )
      );

      $(markup).insertAfter(this);

      $(data.holder).css("width", settings.width);
      $(data.holder).css("min-height", settings.height);
      $(data.holder).css("height", settings.height);

      if ($(data.real_input).val() !== "") {
        $.fn.tagsInput.importTags($(data.real_input), $(data.real_input).val());
      }

      // Stop here if interactive option is not chosen
      if (!settings.interactive) return;

      $(data.fake_input).val("");
      $(data.fake_input).data("pasted", false);

      $(data.fake_input).on("focus", data, function (event) {
        $(data.holder).addClass("focus");

        if ($(this).val() === "") {
          $(this).removeClass("error");
        }
      });

      $(data.fake_input).on("blur", data, function (event) {
        $(data.holder).removeClass("focus");
      });

      if (
        settings.autocomplete !== null &&
        jQuery.ui.autocomplete !== undefined
      ) {
        $(data.fake_input).autocomplete(settings.autocomplete);
        $(data.fake_input).on("autocompleteselect", data, function (event, ui) {
          $(event.data.real_input).addTag(ui.item.value, {
            focus: true,
            unique: settings.unique,
          });

          return false;
        });

        $(data.fake_input).on("keypress", data, function (event) {
          if (_checkDelimiter(event)) {
            $(this).autocomplete("close");
          }
        });
      } else {
        $(data.fake_input).on("blur", data, function (event) {
          $(event.data.real_input).addTag($(event.data.fake_input).val(), {
            focus: true,
            unique: settings.unique,
          });

          return false;
        });
      }

      // If a user types a delimiter create a new tag
      $(data.fake_input).on("keypress", data, function (event) {
        if (_checkDelimiter(event)) {
          event.preventDefault();

          $(event.data.real_input).addTag($(event.data.fake_input).val(), {
            focus: true,
            unique: settings.unique,
          });

          return false;
        }
      });

      $(data.fake_input).on("paste", function () {
        $(this).data("pasted", true);
      });

      // If a user pastes the text check if it shouldn't be splitted into tags
      $(data.fake_input).on("input", data, function (event) {
        if (!$(this).data("pasted")) return;

        $(this).data("pasted", false);

        var value = $(event.data.fake_input).val();

        value = value.replace(/\n/g, "");
        value = value.replace(/\s/g, "");

        var tags = _splitIntoTags(event.data.delimiter, value);

        if (tags.length > 1) {
          for (var i = 0; i < tags.length; ++i) {
            $(event.data.real_input).addTag(tags[i], {
              focus: true,
              unique: settings.unique,
            });
          }

          return false;
        }
      });

      // Deletes last tag on backspace
      data.removeWithBackspace &&
        $(data.fake_input).on("keydown", function (event) {
          if (event.keyCode == 8 && $(this).val() === "") {
            event.preventDefault();
            var lastTag = $(this)
              .closest(".tagsinput")
              .find(".tag:last > span")
              .text();
            var id = $(this).attr("id").replace(/_tag$/, "");
            $("#" + id).removeTag(encodeURI(lastTag));
            $(this).trigger("focus");
          }
        });

      // Removes the error class when user changes the value of the fake input
      $(data.fake_input).keydown(function (event) {
        // enter, alt, shift, esc, ctrl and arrows keys are ignored
        if (
          jQuery.inArray(event.keyCode, [
            13,
            37,
            38,
            39,
            40,
            27,
            16,
            17,
            18,
            225,
          ]) === -1
        ) {
          $(this).removeClass("error");
        }
      });
    });

    return this;
  };

  $.fn.tagsInput.updateTagsField = function (obj, tagslist) {
    var id = $(obj).attr("id");
    $(obj).val(tagslist.join(_getDelimiter(delimiter[id])));
  };

  $.fn.tagsInput.importTags = function (obj, val) {
    $(obj).val("");

    var id = $(obj).attr("id");
    var tags = _splitIntoTags(delimiter[id], val);

    for (i = 0; i < tags.length; ++i) {
      $(obj).addTag(tags[i], {
        focus: false,
        callback: false,
      });
    }

    if (callbacks[id] && callbacks[id]["onChange"]) {
      var f = callbacks[id]["onChange"];
      f.call(obj, obj, tags);
    }
  };

  var _getDelimiter = function (delimiter) {
    if (typeof delimiter === "undefined") {
      return delimiter;
    } else if (typeof delimiter === "string") {
      return delimiter;
    } else {
      return delimiter[0];
    }
  };

  var _validateTag = function (value, inputSettings, tagslist, delimiter) {
    var result = true;

    if (value === "") result = false;
    if (value.length < inputSettings.minChars) result = false;
    if (
      inputSettings.maxChars !== null &&
      value.length > inputSettings.maxChars
    )
      result = false;
    if (inputSettings.limit !== null && tagslist.length >= inputSettings.limit)
      result = false;
    if (
      inputSettings.validationPattern !== null &&
      !inputSettings.validationPattern.test(value)
    )
      result = false;

    if (typeof delimiter === "string") {
      if (value.indexOf(delimiter) > -1) result = false;
    } else {
      $.each(delimiter, function (index, _delimiter) {
        if (value.indexOf(_delimiter) > -1) result = false;
        return false;
      });
    }

    return result;
  };

  var _checkDelimiter = function (event) {
    var found = false;

    if (event.which === 13) {
      return true;
    }

    if (typeof event.data.delimiter === "string") {
      if (event.which === event.data.delimiter.charCodeAt(0)) {
        found = true;
      }
    } else {
      $.each(event.data.delimiter, function (index, delimiter) {
        if (event.which === delimiter.charCodeAt(0)) {
          found = true;
        }
      });
    }

    return found;
  };

  var _splitIntoTags = function (delimiter, value) {
    if (value === "") return [];

    if (typeof delimiter === "string") {
      return value.split(delimiter);
    } else {
      var tmpDelimiter = "∞";
      var text = value;

      $.each(delimiter, function (index, _delimiter) {
        text = text.split(_delimiter).join(tmpDelimiter);
      });

      return text.split(tmpDelimiter);
    }

    return [];
  };
})(jQuery);

