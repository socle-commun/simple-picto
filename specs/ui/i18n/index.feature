Feature: Gestion du locale d'affichage

  Scenario: Le locale sélectionné par défaut celui du système
    Given L'utilisateur a sélectionné un locale  au niveau système
    Then L'interface affiche le locale sélectionné

  Scenario: L'utilisateur sélectionne un autre locale
    Given L'utilisateur accède aux paramètres du locale  
    When Il sélectionne une autre option de locale  
    Then L'interface passe sur le nouveau locale 
Feature: Persistance  locale
  Scenario: Le locale sélectionné est conservé après une reconnexion
    Given L'utilisateur a sélectionné un locale
    And Il se déconnecte puis se reconnecte  
    Then L'interface affiche le locale précédemment sélectionné  