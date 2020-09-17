# AuraMultiSelect
A Lightning Multi-Select Picklist.

## I have an lwc version available: https://github.com/rapsacnz/lwcMultiSelect check it out - it uses pills to show the chosen items, which I think is cool.

To use, simply add as part of a form (or without if you'd like):

    <c:MultiSelect aura:id="my-multi-select" options="{!v.options}" selectChange="{!c.handleSelectChangeEvent}" selectedItems="{!v.mySelectedItems}" />
    
The multiselect `options` are an array of objects eg `{label:'label',value:'value'}` and selectedItems is a comma delimited string (`String[]`).

The `handleSelectChangeEvent` method could look like this:

    //changes filter parameters
    handleSelectChangeEvent: function(component, event, helper) {
        var items = component.get("v.items");
        items = event.getParam("values");
        component.set("v.items", items);
    }


What it looks like:

[![Multiselect gif][1]][1]


## Extended Implementation Example

This example shows feeding in some values that will show up immediately after the component is initialized.
NOTE - the type is `Object[]` rather than a typed `SelectItem[]` array. For some reason, the typed version is not parsed and is fed to the child component as a string.

Also note, I've added an init handler to the component.

    <aura:application access="global" extends="force:slds" >
        
        <aura:attribute name="options" type="Object[]" default="[
      {
        'label': 'Annual Review',
        'value': 'Annual Review'
      },
      {
        'label': 'Watching Rates',
        'value': 'Watching Rates'
      },
      {
        'label': 'Initial Contact',
        'value': 'Initial Contact'
      },
      {
        'label': 'Application',
        'value': 'Application'
      },
      {
        'label': 'Waiting for Qualifying Documentation',
        'value': 'Waiting for Qualifying Documentation'
      },
      {
        'label': 'Qualifying Documentation Review',
        'value': 'Qualifying Documentation Review'
       }]"/>
        
       <c:MultiSelect options="{!v.options}" label="Testing Testing" />
    
    </aura:application>
    
Init handler:

    <aura:handler name="init" value="{!this}" action="{!c.init}"/>
    
## UPDATE 2018-06-14:
- Changed structure to make a slds form item. If you don't want that, just remove this div.
- Added a label attribute. 
- Added a variant attribute. Set to 'label-hidden' to hide the label.
- Options are now just regular javascript objects.
- Updated this file with new usage structure.
- Loading now runs once on init. A flag prevents this method being called again on options change unless reset.
- Call reInit() to load again.

    
## Extra notes:
You can also use a change handler to handle any changes to your options list after the component is rendered:

    <aura:handler name="change" value="{!options}" action="{!c.init}"/>
    
Note, you may need to deal with recursion issues here - make sure your init routine doesn't change the options arrray... as it happens, most of this risk is mitigated as internally, a different list (`options_`) is used.

Finally, if you don't want to use a change handler, you can call this method: `reInit()`. It's a public method on the component that reruns the init method again. 

From outside, you'd typically change the options array, find the multiselect component and call `reInit()`

Let me know if you find any bugs.


  [1]: http://i.imgur.com/22RPF0k.gif



