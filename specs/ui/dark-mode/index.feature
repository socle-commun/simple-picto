Feature: Mode d'affichage clair ou sombre  

  Scenario: Le mode d'affichage par défaut est le mode clair  
    Given Un nouvel utilisateur accède à l'application pour la première fois  
    Then L'interface est affichée en mode clair  

  Scenario: Le mode sélectionné est par défaut celui du système
    Given L'utilisateur a sélectionné un mode d'affichage sombre  au niveau système
    Then L'interface affiche le mode d'affichage précédemment sélectionné

  Scenario: L'utilisateur sélectionne le mode sombre  
    Given L'utilisateur accède aux paramètres d'affichage  
    When Il sélectionne l'option "Mode sombre"  
    Then L'interface passe en mode sombre  

  Scenario: L'utilisateur sélectionne le mode clair  
    Given L'utilisateur accède aux paramètres d'affichage  
    When Il sélectionne l'option "Mode clair"  
    Then L'interface passe en mode clair  

  Scenario: Le mode sélectionné est appliqué sur toutes les pages  
    Given L'utilisateur a sélectionné un mode d'affichage  
    When Il navigue entre différentes pages de l'application  
    Then L'interface conserve le mode d'affichage sélectionné  
Feature: Persistance  locale
  Scenario: Le mode sélectionné est conservé après une reconnexion  
    Given L'utilisateur a sélectionné un mode d'affichage  
    And Il se déconnecte puis se reconnecte  
    Then L'interface affiche le mode d'affichage précédemment sélectionné  