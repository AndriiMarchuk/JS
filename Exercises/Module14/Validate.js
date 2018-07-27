/**
 * Validate.js: unobtrusive HTML form validation.
 *
 * On document load, this module scans the document for HTML forms and
 * textfield form elements. If it finds elements that have a "required" or
 * "pattern" attribute, it adds appropriate event handlers for client-side
 * form validation.
 *
 * If a form element has a "pattern" attribute, the value of that attribute
 * is used as a JavaScript regular expression, and the element is given an
 * onchange event handler that tests the user's input against the pattern.
 * If the input does not match the pattern, the background color of the
 * input element is changed to bring the error to the user's attention.
 * By default, the textfield value must contain some substring that matches
 * the pattern. If you want to require the complete value to match precisely,
 * use the ^ and $ anchors at the beginning and end of the pattern.
 *
 * A form element with a "required" attribute must have a value provided.
 * The presence of "required" is shorthand for pattern="\S". That is, it
 * simply requires that the value contain a single non-whitespace character
 *
 * If a form element passes validation, its "class" attribute is set to
 * "valid". And if it fails validation, its class is set to "invalid".
 * In order for this module to be useful, you must use it in conjunction with
 * a CSS stylesheet that defines styles for "invalid" class.  For example:
 *
 *    <!-- attention grabbing orange background for invalid form elements -->
 *    <style>input.invalid { background: #fa0; }</style>
 *
 * When a form is submitted, the textfield elements subject to validation are
 * revalidated. If any fail, the submission is blocked and a dialog box
 * is displayed to the user letting him know that the form is incomplete
 * or incorrect.
 *
 * You may not use this module to validate any form fields or forms on which
 * you define your own onchange or onsubmit event handlers, or any fields
 * for which you define a class attribute.
 *
 * This module places all its code within an anonymous function and does
 * not define any symbols in the global namespace.
 */
(function( ) { // Do everything in this one anonymous function
    // When the document finishes loading, call init( )
    if (window.addEventListener) window.addEventListener("load", init, false);
    else if (window.attachEvent) window.attachEvent("onload", init);

    // Define event handlers for any forms and form elements that need them.
    function init( ) {
    }

    // This function is the onchange event handler for textfields that
    // require validation. Remember that we converted the required attribute
    // to a pattern attribute in init( ).
    function validateOnChange( ) {
    }

    // This function is the onsubmit event handler for any form that
    // requires validation.
    function validateOnSubmit( ) {
        // When the form is submitted, we revalidate all the fields in the
        // form and then check their classNames to see if they are invalid.
        // If any of those fields are invalid, display an alert and prevent
        // form submission.
    }
})( );

