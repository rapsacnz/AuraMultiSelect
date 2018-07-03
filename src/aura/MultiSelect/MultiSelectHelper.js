({
  init: function(component) {

    //note, we get options and set options_
    //options_ is the private version and we use this from now on.
    //this is to allow us to sort the options array before rendering
    if (component.get("v.initialized")){
      return;
    }
    component.set("v.initialized",true);

    var options = component.get("v.options");
    options.sort(function compare(a, b) {
      if (a.value == 'All') {
        return -1;
      } else if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    });

    component.set("v.options_", options);
    var labels = this.getSelectedLabels(component);
    this.setInfoText(component, labels);
  },  

  setInfoText: function(component, values) {
    
    if (values.length == 0) {
      component.set("v.infoText", "Select an option...");
    }
    if (values.length == 1) {
      component.set("v.infoText", values[0]);
    }
    else if (values.length > 1) {
      component.set("v.infoText", values.length + " options selected");
    }
  },

  getSelectedValues: function(component){
    var options = component.get("v.options_");
    var values = [];
    options.forEach(function(element) {
      if (element.selected) {
        values.push(element.value);
      }
    });
    return values;
  },

  getSelectedLabels: function(component){
    var options = component.get("v.options_");
    var labels = [];
    options.forEach(function(element) {
      if (element.selected) {
        labels.push(element.label);
      }
    });
    return labels;
  },

  despatchSelectChangeEvent: function(component,values){
    var compEvent = component.getEvent("selectChange");
    compEvent.setParams({ "values": values });
    compEvent.fire();
  }
})
