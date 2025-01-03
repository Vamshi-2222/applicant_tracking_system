var counter = 1;
var limit = 5;

function addInput(divName) {
    if (counter == limit) {
        alert("You have reached the limit of adding " + counter + " inputs");
    } else {
        var newdiv = document.createElement('div');
        newdiv.innerHTML = "Entry " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
        document.getElementById(divName).appendChild(newdiv);
        counter++;
    }
}

var fileId = 1; // used by the addFile() function to keep track of IDs
function addFile() {
    fileId++; // increment fileId to get a unique ID for the new element
    if (fileId > limit) {
        console.log('limit cross');
    } else {
        console.log(fileId);
        var html =
            '<div class="form-group">' +
            '<input type="text" class="form-control" placeholder="Mobile" name="mobile'+fileId+'" aria-label="Recipients username" aria-describedby="button - addon2">' +

            '</div>';
        addElement('files', 'div', 'mobile' + fileId, html);
    }
}

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.classList.add("col-md-6");
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

var emailId = 1; // used by the addFile() function to keep track of IDs
function addEmail() {
    emailId++; // increment fileId to get a unique ID for the new element
    if (emailId > limit) {
        console.log('limit cross');
    } else {
        console.log(emailId);
        var html =
            '<div class="form-group">' +
            '<input type="text" class="form-control" name="email'+emailId+'" placeholder="Email" aria-label="Recipients username" aria-describedby="button - addon2">' +
            '</div>';
        addEmailElement("emailfiles", "div", "email" + emailId, html);
    }
}

function addEmailElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.classList.add("col-md-6");
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}





var companyID = 0; // used by the addFile() function to keep track of IDs
function addCompany() {
    companyID++; // increment fileId to get a unique ID for the new element
    if (companyID == limit) {
        console.log('limit cross');
    } else {
        console.log(companyID);
        var html =
            `<div class="row ">
                                        <div class="col-md-12 ">
                                            <div class="form-group ">
                                                <label>Y Name</label>
                                                <input type="organization-title" class="form-control"
                                                    placeholder="Company Name" autocomplete="on">
                                            </div>
                                        </div>

                                    </div>
                                    <hr>
                                    <div class="row ">
                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label>Company Industry</label>
                                                <select class="form-control select2 " style="width: 100%; ">
                                                    <option selected="selected ">Select</option>
                                                    <option>ITI</option>
                                                    <option>Diploma</option>
                                                    <option>12</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label for="Reference ">Role</label>
                                                <select class="form-control select2 " style="width: 100%; ">
                                                    <option selected="selected ">Select</option>
                                                    <option>ITI</option>
                                                    <option>Diploma</option>
                                                    <option>12</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row ">
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label for="Reference ">Start year</label>
                                                <input type="date" id="birthday " name="birthday "
                                                    class="form-control ">
                                            </div>
                                        </div>
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label for="Reference ">End year</label>
                                                <input type="date" id="birthday " name="birthday "
                                                    class="form-control ">
                                            </div>
                                        </div>
                                        <div class="col-md-4 ">
                                            <div class="form-group ">
                                                <label>Salary</label>
                                                <select class="form-control select2 " style="width: 100%; ">
                                                    <option selected="selected ">Select</option>
                                                    <option>10k</option>
                                                    <option>20k</option>
                                                    <option>30k</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>`;

        addCompanyElement('company', 'div', 'company-' + companyID, html);
    }
}

function addCompanyElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
    console.log(p);
}



var preferenceID = 0; // used by the addFile() function to keep track of IDs
function addPreferences() {
    preferenceID++; // increment fileId to get a unique ID for the new element
    if (preferenceID == limit) {
        console.log('limit cross');
    } else {
        console.log(preferenceID);
        var html =
            `<div class="row ">
                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label>Prefered Industry</label>
                                                <select class="form-control select2 " style="width: 100%; ">
                                                    <option selected="selected ">Select</option>
                                                    <option>MA</option>
                                                    <option>M.Sc</option>
                                                    <option>M.Com</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-6 ">
                                            <div class="form-group ">
                                                <label>Prefered Job Role</label>
                                                <select class="form-control select2 " style="width: 100%; ">
                                                    <option selected="selected ">Select</option>
                                                    <option>MA</option>
                                                    <option>M.Sc</option>
                                                    <option>M.Com</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>`;

        addPreferenceElement('prefer', 'div', 'preference-' + preferenceID, html);
    }
}

function addPreferenceElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
    console.log(p);
}

// Input Tag autocomplete
$(document).ready(function () {
    $(".js-example-basic-multiple").select2({
    });
});