(function() {
  // ExoController est le ViewModel pour Backbone. La View, c'est le HTML
  function ExoController() {
    // 3. on crée des listes en dur, pas besoin d'observableArray
    this.frameworks = ['Backbone', 'Ember', 'Angular'];
    this.grades = [1, 2, 3, 4, 5];


    /* 1. on montre que le templating simple marche
    this.chosenFramework = 'Backbone';
    this.chosenGrade = '5';
    // 2. on montre que le binding marche
    this.chosenFramework = ko.observable('Backbone');
    this.chosenGrade = ko.observable(4);
    */

    this.chosenFramework = ko.observable();
    this.chosenGrade = ko.observable();

    // 4. après avoir parlé des computed observable
    this.bothChosen = function bothChosen() {
      return this.chosenFramework() && this.chosenGrade();
    };
  }

  ko.applyBindings(new ExoController());

})();
