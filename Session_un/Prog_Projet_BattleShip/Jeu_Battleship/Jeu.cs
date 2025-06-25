using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using Jeu_Battleship;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Jeu_Battleship
{
    internal class Jeu_Battleship
    {
        private static char[,] tableauCacher = TableauSimple();
        private static char[,] tableauJoueur;
        private static char[,] tableauEnnemi;       
        private static int choixPlacement = 0;
        private static int pdvJoueur;
        private static int pdvEnnemi;
        private static bool tourJoueur;
        private static bool tourEnnemi;
        private static bool tireToucher;

        static void Main(string[] args)
        {
            // Menu principale
            static void Main(string[] args)
            {
                int rejouer;
                do
                {
                    AfficherMenuPrincipal();
                    LancerPartie();
                    rejouer = DemanderRejouer();
                } while (rejouer == 1);
            }

            static void AfficherMenuPrincipal()
            {
                Console.Clear();
                EnTetePrincipale();
                MenuPrincipale();
            }

            static void LancerPartie()
            {
                // Menu de lancement de la partie
                EnTetePrincipale();

                // Systeme de choix pour le placement des bateaux
                bool valide = false;
                string choix = "";
                // Menu en boucle de validation de notre variable choixPlacement
                while (!valide)
                {
                    Console.Clear();
                    EnTetePrincipale();
                    Console.WriteLine();
                    Console.WriteLine(" Comment désires-tu placer tes bateaux dans ta grille?");
                    Console.WriteLine(" (1) Aléatoire.");
                    Console.WriteLine(" (2) Manuellement.");
                    Console.Write(" Entrez votre choix entre (1) et (2) : ");
                    choix = Console.ReadLine();

                    Int32.TryParse(choix, out choixPlacement);

                    if (choix.Length == 1 && char.IsDigit(choix[0]) && (choixPlacement == 1 || choixPlacement == 2))
                    {
                        valide = true;
                    }
                    else
                    {
                        // Message pour les commandes non-valide avec une condition boolean qui retourne au choix.
                        Console.Clear();
                        EnTetePrincipale();
                        Console.WriteLine();
                        Console.Write(" Vous avez entrée une commande");
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.Write(" non valide, ");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.WriteLine("retour au choix precedent.");
                        Console.ReadKey();
                    }
                }

                // Choix 1. ALEATOIRE - Configure les deux tableaux de facon aleatoire.         
                if (choixPlacement == 1)
                {
                    Console.Clear();
                    EnTetePrincipale();
                    PlacementBateauxJoueur();
                    PlacementBateauxEnnemi();
                    Console.ForegroundColor = ConsoleColor.White;
                }
                // Choix 2. MANUELLEMENT - Configuration du tableauJoueur de facon manuel et le tableauEnnemi de facon aleatoire. 
                if (choixPlacement == 2)
                {
                    Console.Clear();
                    EnTetePrincipale();
                    PlacementBateauxJoueur();
                    PlacementBateauxEnnemi();
                    Console.ForegroundColor = ConsoleColor.White;
                }

                // Condition qui determine le premier a tirer.
                Random premierTour = new Random();
                int premier = premierTour.Next(1, 3);
                if (premier == 1) { tourJoueur = true; }
                if (premier == 2) { tourEnnemi = true; }

                // Debut du systeme de jeu tour a tour.
                Console.Clear();
                AfficherTableauDeJeu();
                Console.WriteLine();
                Console.WriteLine(" La partie va commencer.");
                Console.WriteLine(" Appuyez sur une touche pour déterminer de manière aléatoire le joueur qui débute.");
                Console.ReadKey();
                do
                {
                    Console.Clear();
                    SystemeDeTourParTour();
                } while (pdvEnnemi > 0 && pdvJoueur > 0);

                if (pdvEnnemi == 0)
                {
                    Console.WriteLine();
                    Console.WriteLine(" La partie est terminée.");
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine(" Vous avez gagné!");
                    Console.ForegroundColor = ConsoleColor.White;
                }
                if (pdvJoueur == 0)
                {
                    Console.WriteLine();
                    Console.WriteLine(" La partie est terminée.");
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine(" Vous avez perdu.");
                    Console.ForegroundColor = ConsoleColor.White;
                }
            }


            // Fonction qui demande si le joueur veut rejouer avec une validation de choix. (Retourne --> int = rejouer)
            static int DemanderRejouer()
            {
                int choix;
                bool valide = false;
                do
                {
                    Console.WriteLine();
                    Console.WriteLine("Voulez-vous rejouer?");
                    Console.WriteLine("(1) Oui");
                    Console.WriteLine("(2) Non");
                    Console.Write("Votre choix: ");
                    string menuRejouer = Console.ReadLine();

                    // Validation de l'entree avec condition et ajout tryparse, peut seulement etre 1 ou 2.
                    // Inspire de la fonction DemanderPlacementBateaux() pour la validation et du lien suivant : https://stackoverflow.com/questions/72985924/how-to-replay-the-game-and-break-out-of-a-loop
                    if (int.TryParse(menuRejouer, out choix) && (choix == 1 || choix == 2))
                    {
                        valide = true;
                    }
                    else
                    {
                        Console.Clear();
                        EnTetePrincipale();
                        Console.WriteLine();
                        Console.Write("Vous avez entré une commande");
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.Write(" non valide, ");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.WriteLine("retour au choix précédent.");
                    }
                } while (!valide);

                return choix;
            }
            int rejouer = 1;
            EnTetePrincipale();
            MenuPrincipale();
            do
            {
                // Menu de lancement de la partie
                EnTetePrincipale();

                // Systeme de choix pour le placement des bateaux
                bool valide = false;
                string choix = "";
                // Menu en boucle de validation de notre variable choixPlacement
                while (valide == false)
                {
                    Console.Clear();
                    EnTetePrincipale();
                    Console.WriteLine();
                    Console.WriteLine(" Comment désires-tu placer tes bateaux dans ta grille?");
                    Console.WriteLine(" (1) Aléatoire.");
                    Console.WriteLine(" (2) Manuellement.");
                    Console.Write(" Entrez votre choix entre (1) et (2) : ");
                    choix = Console.ReadLine();
                    
                    Int32.TryParse(choix, out choixPlacement);

                    if (choix.Length == 1 && char.IsDigit(choix[0]) && (choixPlacement == 1 || choixPlacement == 2))
                    {                       
                        valide = true;
                    }
                    else
                    {
                        // Message pour les comm
                        // andes non-valide avec une condition boolean qui retourne au choix.
                        Console.Clear();
                        EnTetePrincipale();
                        Console.WriteLine();
                        Console.Write(" Vous avez entrée une commande"); Console.ForegroundColor = ConsoleColor.Red; Console.Write(" non valide, ");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.WriteLine("retour au choix precedent.");
                        Console.ReadKey();
                        valide = false;
                    }                                              
                }

                // Choix 1. ALEATOIRE - Configure les deux tableaux de facon aleatoire.         
                if (choixPlacement == 1)
                {
                    Console.Clear();
                    EnTetePrincipale();
                    PlacementBateauxJoueur();
                    PlacementBateauxEnnemi();
                    Console.ForegroundColor = ConsoleColor.White;
                }
                // Choix 2. MANUELLEMENT - Configuration du tableauJoueur de facon manuel et le tableauEnnemi de facon aleatoire. 
                if (choixPlacement == 2)
                {
                    Console.Clear();
                    EnTetePrincipale();
                    PlacementBateauxJoueur();
                    PlacementBateauxEnnemi();
                    Console.ForegroundColor = ConsoleColor.White;
                }

                // Condition qui determine le premier a tirer.
                Random premierTour = new Random();
                int premier = premierTour.Next(1, 3);
                if (premier == 1) { tourJoueur = true; }
                if (premier == 2) { tourEnnemi = true; }

                // Debut du systeme de jeu tour a tour.
                Console.Clear();              
                AfficherTableauDeJeu();
                Console.WriteLine();
                Console.WriteLine(" La partie va commencer.");
                Console.WriteLine(" Appuyez sur une touche pour déterminer de manière aléatoire le joueur qui débute.");
                Console.ReadKey();
                do
                {
                    Console.Clear();
                    SystemeDeTourParTour();
                } while (pdvEnnemi > 0 && pdvJoueur > 0);

                if (pdvEnnemi == 0)
                {
                    Console.WriteLine();
                    Console.WriteLine(" La partie est terminée.");
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine(" Vous avez gagné!");
                    Console.ForegroundColor = ConsoleColor.White;
                }  
                if (pdvJoueur == 0)
                {
                    Console.WriteLine();
                    Console.WriteLine(" La partie est terminée.");
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine(" Vous avez perdu.");
                    Console.ForegroundColor = ConsoleColor.White;
                }

                while (rejouer == 1)
                {
                    Console.WriteLine();
                    Console.WriteLine("Voulez vous rejouer?");
                    Console.WriteLine("(1) Oui ");
                    Console.WriteLine("(2) Non ");
                    Console.Write("Votre choix: ");
                    rejouer = Convert.ToInt32(Console.ReadLine);

                    if (rejouer == 1)
                    {
                        valide = true;
                    }
                    else if (rejouer == 2)
                    {
                        valide = false;
                    }
                    else
                    {
                        // Message pour les commandes non-valide avec une condition integer qui retourne au choix.
                        Console.Clear();
                        EnTetePrincipale();
                        Console.WriteLine();
                        Console.Write(" Vous avez une entrée une commande"); Console.ForegroundColor = ConsoleColor.Red; Console.Write(" non valide, ");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.WriteLine("retour au choix precedent.");
                        valide = false;
                    }
                }
            } while (rejouer == 1);
        }

        // Fonction qui permet d'etablir un choix de placement de bateaux. (Retourne --> int = choixPlacement)
        static void ChoixPlacement()
            {
                bool valide = false;
                int choixPlacement = 0;
                while (valide == false)
                {
                    Console.WriteLine();
                    Console.WriteLine(" Comment désirez-vous placer votre flotte de bateaux dans votre grille de jeu?");
                    Console.WriteLine(" (1) Aléatoire.");
                    Console.WriteLine(" (2) Manuellement.");
                    Console.Write(" Entrer votre choix entre (1) et (2) : ");
                    choixPlacement = Convert.ToInt32(Console.ReadLine());

                    if (choixPlacement == 1 | choixPlacement == 2)
                    {
                        valide = true;
                    }
                    else
                    {
                        // Message pour les commandes non-valide avec une condition boolean qui retourne au choix.
                        Console.Clear();
                        EnTetePrincipale();
                        Console.WriteLine();
                        Console.Write(" Vous avez une entrée une commande"); Console.ForegroundColor = ConsoleColor.Red; Console.Write(" non valide, ");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.WriteLine("retour au choix precedent.");
                        valide = false;
                    }
                }
            }

        // Initialisation d'un tableau 10x10 de '.' (Retourne --> char [,]tableau = tableau)
        static char[,] TableauSimple()
        {
            char[,] tableau = new char[10, 10];
            for (int i = 0; i < 10; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    tableau[i, j] = '.';
                }
            }
            return tableau;
        }

        // Afficher Tableau simple pour modifier le placement manuellement (Utilisation dans PlacementBateauxManuellement seulement.)
        static void AfficherTableauSimple(char[,] tableau = null)
        {
            if (tableau == null)
            {
                tableau = TableauSimple();
            }

            Console.WriteLine();
            Console.Write("   ");
            for (int j = 0; j < 10; j++)
            {
                Console.ForegroundColor = ConsoleColor.White;
                Console.Write((char)('A' + j) + " ");
            }
            Console.WriteLine();

            for (int i = 0; i < 10; i++)
            {
                Console.ForegroundColor = ConsoleColor.White;
                Console.Write((i + 1).ToString().PadLeft(2) + " ");
                for (int j = 0; j < 10; j++)
                {
                    if (tableau[i, j] == 'B')
                    {
                        Console.ForegroundColor = ConsoleColor.Green;
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.DarkBlue;
                    }
                    Console.Write(tableau[i, j] + " ");
                    Console.ForegroundColor = ConsoleColor.White;
                }
                Console.WriteLine();
            }
        }

        // Affichage des tableaux de jeu pour le joueur et l'ordinateur. (Utilisation frequente au travers le jeu.)
        static void AfficherTableauDeJeu()
        {
            EnTetePrincipale();
            Console.WriteLine();
            // Initialisation de deux lignes qui nomme et enumere les tableaux.
            string ligne0 = " Tableau ennemi".PadRight(25) + "  Votre tableau";
            string ligne1 = "   A B C D E F G H I J".PadRight(25) + "    A B C D E F G H I J";

            Console.WriteLine(ligne0); // Affichage des premieres ligne qui qui nomme et enumeres les tableaux.
            Console.WriteLine(ligne1);

            for (int i = 0; i < 10; i++)
            {
                int colonne = (i + 1);
                // Creation d'une string ligneTableauCacher pour afficher mon tableau selon la valeur de mon "Char Array" tableau CPU.   
                string ligneTableauCacher = " ";
                if (i < 9)
                {
                    for (int j = 0; j < 10; j++)
                    {
                        ligneTableauCacher += tableauCacher[i, j] + " ";
                    }
                }
                else
                {
                    ligneTableauCacher = "";
                    for (int j = 0; j < 10; j++)
                    {
                        ligneTableauCacher += tableauCacher[i, j] + " ";
                    }
                }

                // Creation d'une string ligneTableauEnnemi pour afficher mon tableau selon la valeur de mon "Char Array" tableau Ennemi.
                string ligneTableauEnnemi = " ";
                if (i < 9)
                {
                    for (int j = 0; j < 10; j++)
                    {
                        ligneTableauEnnemi += tableauEnnemi[i, j] + " ";
                    }
                }
                else
                {
                    ligneTableauEnnemi = "";
                    for (int j = 0; j < 10; j++)
                    {
                        ligneTableauEnnemi += tableauEnnemi[i, j] + " ";
                    }
                }

                // Creation d'une string ligneTableauJoueur pour afficher mon tableau selon la valeur de mon "Char Array" tableau Joueur.
                string ligneTableauJoueur = " ";
                if (i < 9)
                {
                    for (int j = 0; j < 10; j++)
                    {
                        ligneTableauJoueur += tableauJoueur[i, j] + " ";
                    }
                }
                else
                {
                    ligneTableauJoueur = "";
                    for (int j = 0; j < 10; j++)
                    {
                        ligneTableauJoueur += tableauJoueur[i, j] + " ";
                    }
                }

                // Affichage des tableaux cote a cote
                if (i < 9) // Affichage des ligne 1 a 9
                {
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write(" " + colonne);
                    Console.ForegroundColor = ConsoleColor.DarkBlue;

                    for (int k = 0; k < ligneTableauCacher.Length; k++)
                    {
                        if (ligneTableauCacher[k] == 'B')
                        {
                            Console.ForegroundColor = ConsoleColor.Green;
                        }
                        if (ligneTableauCacher[k] == 'O')
                        {
                           Console.ForegroundColor = ConsoleColor.White;
                        }
                        if (ligneTableauCacher[k] == 'X')
                        {
                            Console.ForegroundColor = ConsoleColor.Red;
                        }
                        Console.Write(ligneTableauCacher[k]);
                        Console.ForegroundColor = ConsoleColor.DarkBlue;
                    }

                    Console.Write(string.Empty.PadRight(3));
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write(" " + colonne);
                    Console.ForegroundColor = ConsoleColor.DarkBlue;

                    for (int k = 0; k < ligneTableauJoueur.Length; k++)
                    {
                        if (ligneTableauJoueur[k] == 'B')
                        {
                            Console.ForegroundColor = ConsoleColor.Green;
                        }
                        if (ligneTableauJoueur[k] == 'O')
                        {
                            Console.ForegroundColor = ConsoleColor.White;
                        }
                        if (ligneTableauJoueur[k] == 'X')
                        {
                            Console.ForegroundColor = ConsoleColor.Red;
                        }
                        Console.Write(ligneTableauJoueur[k]);
                        Console.ForegroundColor = ConsoleColor.DarkBlue;
                    }
                }
                else if (i == 9) // Affichage des ligne 10
                {
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write(colonne + " ");
                    Console.ForegroundColor = ConsoleColor.DarkBlue;
                    for (int k = 0; k < ligneTableauCacher.Length; k++)
                    {
                        if (ligneTableauCacher[k] == 'B')
                        {
                            Console.ForegroundColor = ConsoleColor.Green;
                        }
                        if (ligneTableauCacher[k] == 'O')
                        {
                            Console.ForegroundColor = ConsoleColor.White;
                        }
                        if (ligneTableauCacher[k] == 'X')
                        {
                            Console.ForegroundColor = ConsoleColor.Red;
                        }
                        Console.Write(ligneTableauCacher[k]);
                        Console.ForegroundColor = ConsoleColor.DarkBlue;
                    }

                    Console.Write(string.Empty.PadRight(3));
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write(colonne + " ");
                    Console.ForegroundColor = ConsoleColor.DarkBlue;

                    for (int k = 0; k < ligneTableauJoueur.Length; k++)
                    {
                        if (ligneTableauJoueur[k] == 'B')
                        {
                            Console.ForegroundColor = ConsoleColor.Green;
                        }
                        if (ligneTableauJoueur[k] == 'O')
                        {
                            Console.ForegroundColor = ConsoleColor.White;
                        }
                        if (ligneTableauJoueur[k] == 'X')
                        {
                            Console.ForegroundColor = ConsoleColor.Red;
                        }
                        Console.Write(ligneTableauJoueur[k]);
                        Console.ForegroundColor = ConsoleColor.DarkBlue;
                    }
                }
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine();
            }
        }

        // Systeme de tir tour a tour
        static void SystemeDeTourParTour()
        {
            string Toucher = "Touché!";
            string Manquer = "Manqué!";
            string Joueur = " Votre tir a : ";
            string Ennemi = " Le tir de l'ennemi a : ";
            string continuer = " Appuyez sur une touche pour continuer ...";

            // TOUR DU JOUEUR
            if (tourJoueur == true)
            {
                AfficherTableauDeJeu();
                TireJoueur();

                if (tireToucher == true)
                {
                    Console.Clear();
                    AfficherTableauDeJeu();
                    Console.WriteLine();
                    Console.WriteLine(Joueur + Toucher);
                    Console.WriteLine(continuer);
                    Console.ReadKey();
                    pdvEnnemi--;
                }
                tireToucher = false;
            }
            else if (tourJoueur == true)
            {
                Console.Clear();
                TireJoueur();
                Console.Clear();
                AfficherTableauDeJeu();

                Console.WriteLine();
                Console.WriteLine(Joueur + Manquer);
                Console.WriteLine(continuer);
                Console.ReadKey();
            }
            Console.Clear();
            // TOUR DE L'ENNEMI
            if (tourEnnemi == true)
            {
                AfficherTableauDeJeu();
                TireEnnemi();

                if (tireToucher == true)
                {
                    Console.Clear();
                    AfficherTableauDeJeu();
                    Console.WriteLine();
                    Console.WriteLine(Ennemi + Toucher);
                    Console.Write(continuer);
                    Console.ReadKey();
                    pdvJoueur--;
                }
                tireToucher = false;
            }
            else if (tourEnnemi == true)
            {
                AfficherTableauDeJeu();
                TireEnnemi();
                Console.Clear();
                AfficherTableauDeJeu();

                Console.WriteLine();
                Console.WriteLine(Ennemi + Manquer);
                Console.Write(continuer);
                Console.ReadKey();
            }
        }

        // Fonction qui effectue les tirs de cannons du Joueur
        static char[,] TireJoueur()
        {
            bool toucher = false;
            int x = 0;
            int y = 0;

            Console.WriteLine();
            Console.WriteLine("Entrez les coordonnées du tir. (Exemples: A1,D7)");
            Console.Write("Votre tir: ");
            string coordonnees = Console.ReadLine().ToUpper();

            // Validation des coordonnées de tir, en boucle tant que pas selection valide.
            while
                // 1ere validation si la long de coordo est plus petite que 2, si la premiere lettre n'est pas une lettre, si la deuxieme lettre n'est pas un chiffre
                (coordonnees.Length < 2 || !char.IsLetter(coordonnees[0]) || !char.IsDigit(coordonnees[1]) ||
                // 2e validation si la longueur des coordo est >= 3 et si la 2e lettre n'est pas un chiffre
                (coordonnees.Length >= 3 && !char.IsDigit(coordonnees[2])) ||
                // 3e validation que X doit se trouver entre A et J.
                (coordonnees[0] < 'A' || coordonnees[0] > 'J') ||
                // 4e validation que la lettre dans X doit se trouver entre A et J et que le chiffre dans Y doit se trouver entre 1 et 10. 
                //Utilisation du substring car peut pas mentionner le chiffre "10" directement (sinon erreur, doit etre entre 1 et 9)
                (coordonnees[1] < '1' || coordonnees[1] > '9' || (coordonnees.Length > 2 && coordonnees.Substring(1) != "10")))
            {
                Console.Clear();
                AfficherTableauDeJeu();
                Console.WriteLine("Coordonnée invalide ou deja toucher. Veuillez réssayer une coordonnée.");
                Console.Write("Votre tir: ");
                coordonnees = Console.ReadLine().ToUpper();
            }

            y = coordonnees[0] - 'A';
            x = int.Parse(coordonnees.Substring(1)) - 1;

            if (x < 0 || x >= 10 || y < 0 || y >= 10 || tableauEnnemi[x, y] == 'O' || tableauEnnemi[x, y] == 'X')
            {
                Console.Clear();
                AfficherTableauDeJeu();
                Console.WriteLine();
                Console.WriteLine("Coordonnée invalide ou deja toucher. Veuillez réssayer une coordonnée.");
                Console.ReadKey();
                return tableauEnnemi;
            }

            if (tableauEnnemi[x, y] == 'B')
            {
                for (int i = 0; i < 10; i++)
                {                       
                    tableauEnnemi[x, y] = 'X';                        
                }
                for (int i = 0; i < 10; i++)
                {
                    tableauCacher[x, y] = 'X';
                }
                tireToucher = true;
            }
            else if (tableauEnnemi[x, y] == '.')
            {
                for (int i = 0; i < 10; i++)
                {                     
                    tableauEnnemi[x, y] = 'O';                        
                }
                for (int i = 0; i < 10; i++)
                {
                    tableauCacher[x, y] = 'O';
                }
                tireToucher = false;
            }

            tourJoueur = false;
            tourEnnemi = true;
            return tableauEnnemi;
        }

        // Fonction qui effectue les tirs de cannons
        static char[,] TireEnnemi()
        {
            Random random = new Random();                       // Initialisation d'une variable "random". 
            bool toucher = false;                               // Initialisation d'une variable "toucher".
            int randomX = random.Next(1, 9);
            int randomY = random.Next(1, 9);

            Console.WriteLine();
            Console.WriteLine("Appuyez sur une touche pour simuler le tour de l'ennemi.");
            Console.ReadKey();

            // Nouvelle tentative de tire aleatoire.
            do
            {                
                randomX = random.Next(1, 9);
                randomY = random.Next(1, 9);
            }while (tableauJoueur[randomX, randomY] == 'O' || tableauJoueur[randomX, randomY] == 'X');

            if (tableauJoueur[randomX, randomY] == 'B')
            {
                for (int i = 0; i < 10; i++)
                {
                    tableauJoueur[randomX, randomY] = 'X';
                }
                tireToucher = true;
            }
            else if (tableauJoueur[randomX, randomY] == '.')
            {
                for (int i = 0; i < 10; i++)
                {
                    tableauJoueur[randomX, randomY] = 'O';
                }
                tireToucher = false;
            }
            tourEnnemi = false;
            tourJoueur = true;
            return tableauEnnemi;
        }

        // Fonction finale de placement des bateaux selon le choixPlacement de l'utilisateur. (Retourne --> char[,] = tableauJoueur)
        static char[,] PlacementBateauxJoueur()
        {
            if (choixPlacement == 1)                            // Condition si le choix etait de placer aleatoirement les bateaux.
            {
                tableauJoueur = PlacementBateauxAleatoire();    // Transpose les tableaux generer aleatoirement.              
            }

            else if (choixPlacement == 2)                       // Condition si le choix etait de placer manuellement les bateaux.
            {
                tableauJoueur = PlacementBateauxManuellement(); // Transpose le tableau generer manuellement.          
            }
            return tableauJoueur;
        }

        // Fonction finale de placement des bateaux selon le choixPlacement de l'utilisateur. (Retourne --> char[,] = tableauEnnemi)
        static char[,] PlacementBateauxEnnemi()
        {
            tableauEnnemi = PlacementBateauxAleatoire();    // Transpose les tableaux generer aleatoirement.
            //tableauEnnemi = tableauCacher;                                                  
            return tableauEnnemi;
        }

        // Fonction de placement des bateaux dans les tableaux de facon aleatoire. ( Retourne --> char[,] tableauAleatoire)
        static char[,] PlacementBateauxAleatoire()
        {
            char[,] tableauAleatoire = TableauSimple(); // Initialisation d'un tableau "Char[] tableauAleatoire" pour ensuite le transposer dans mes tableaux de jeu.          
            var bateaux = InitialisationBateaux(); // Initialisation d'une variable bateaux pour l'utilisation de notre "struct Array Bateau[]"

            Random random = new Random();   // Initialisation d'une variable "random" pour utilisation future.        
            foreach (var bateau in bateaux) // Boucle d'iteration qui parcours tous les elements "bateau" dans "bateaux".
            {
                bool place = false;
                while (!place)
                {
                    bool horizontal = random.Next(0, 2) == 0; // Utilisation de notre variable "random" pour générer une orientation aléatoire (0 = horizontal, 1 = vertical)

                    int departX1 = horizontal ? random.Next(1, 9) : random.Next(1, 10 - bateau.Taille - 1); // Génére deux coordonnées de départ aléatoires avec marge de sécurité
                    int departY1 = horizontal ? random.Next(1, 10 - bateau.Taille - 1) : random.Next(1, 9); // pour le TableauCPU

                    // Vérifier si le bateau peut être placé sans chevauchement
                    if (PeutPlacerBateau(tableauAleatoire, departX1, departY1, bateau.Taille, horizontal))
                    {
                        // Placer le bateau dans la grille
                        for (int i = 0; i < bateau.Taille; i++)
                        {
                            if (horizontal)
                            {
                                tableauAleatoire[departX1, departY1 + i] = 'B';      // Conditions pour placer les 'B' du tableauCPU     
                            }
                            else
                            {
                                tableauAleatoire[departX1 + i, departY1] = 'B';      // Conditions pour placer les 'B' du tableauCPU 
                            }
                        }
                        place = true;
                    }
                }
            }
            return tableauAleatoire;
        }

        // Fonction pour placer les 5 bateaux manuellement sur le tableau Simple ( Utilisation dans la fonction PlacementBateauxJoueur().)
        static char[,] PlacementBateauxManuellement()
        {
            var bateaux = InitialisationBateaux();
            char[,] tableauManuel = TableauSimple();  // Initialisation du tableau vide

            // Afficher la grille vide initialement
            AfficherTableauSimple();

            foreach (var bateau in bateaux)
            {
                bool valide = true;
                do
                {
                    // Demander à l'utilisateur de placer le bateau
                    Console.WriteLine();
                    Console.WriteLine("Veuillez placer le bateau " + bateau.Nom + " de taille " + bateau.Taille + " cases.");

                        // Demander les coordonnées de départ
                        Console.Write("Entrez la coordonnée de départ (ex: A1) : ");
                        string coordonnees = Console.ReadLine().ToUpper();
                        // Vérifier si l'entrée est valide (ne contient qu'une lettre suivie d'un chiffre)
                        while (coordonnees.Length < 2 || !char.IsLetter(coordonnees[0]) || !char.IsDigit(coordonnees[1]))
                        {
                            Console.WriteLine("Coordonnée invalide. Veuillez saisir une coordonnée valide (ex: A1).");
                            Console.Write("Entrez la coordonnée de départ (ex: A1) : ");
                            coordonnees = Console.ReadLine().ToUpper();
                        }
                        int y = coordonnees[0] - 'A';
                        int x = int.Parse(coordonnees.Substring(1)) - 1; // Autoriser le 10 en entrée de coordonnées

                    // Demander l'orientation
                    Console.Write("Entrez l'orientation (H pour horizontal, V pour vertical) : ");
                    char orientation = Console.ReadLine().ToUpper()[0];
                    bool horizontal = orientation == 'H';

                    // Vérifier si le bateau peut être placé sans chevauchement
                    if (PeutPlacerBateau(tableauManuel, x, y, bateau.Taille, horizontal))
                    {
                        // Placer le bateau dans la grille
                        for (int i = 0; i < bateau.Taille; i++)
                        {
                            if (horizontal)
                            {
                                tableauManuel[x, y + i] = 'B';
                            }
                            else
                            {
                                tableauManuel[x + i, y] = 'B';
                            }
                        }

                        // Affiche la grille mise à jour après chaque placement de bateau
                        Console.Clear();
                        EnTetePrincipale();
                        AfficherTableauSimple(tableauManuel);

                        valide = false;
                    }
                    else
                    {
                        Console.WriteLine("Placement invalide. Veuillez réessayer.");
                        valide = true;
                    }
                } while (valide == true);
            }
            return tableauManuel;
        }      
        
        // Fonction pour vérifier si un bateau peut être placé sans chevauchement
        static bool PeutPlacerBateau(char[,] tableau, int x, int y, int taille, bool horizontal)
        { 
            // Vérifier si les coordonnées de départ sont dans la grille (Pour placement manuel)
            if (x < 0 ||  x >= 10 ||  y < 0 || y >= 10) return false;

            if (horizontal)
            {
                // Vérifie les limites de la grille
                if (y + taille > 10) return false;

                for (int i = 0; i < taille; i++)
                {
                    if (tableau[x, y + i] != '.') return false; // Vérifie la case actuelle
                }
            }
            else
            {
                // Vérifie les limites de la grille
                if (x + taille > 10) return false;

                for (int i = 0; i < taille; i++)
                {
                    if (tableau[x + i, y] != '.') return false; // Vérifie la case actuelle
                }
            }
            return true; // Aucune collision détectée, placement possible            
        }

        // Déclaration de des bateaux et leurs tailles
        static Bateau[] InitialisationBateaux()
        {
            Bateau[] bateaux = new Bateau[5];
            bateaux[0] = new Bateau("Porte-avion", 5, 5);
            bateaux[1] = new Bateau("Croiseur", 4, 4);
            bateaux[2] = new Bateau("Contre-torpilleur", 3, 3);
            bateaux[3] = new Bateau("Sous-marin", 3, 3);
            bateaux[4] = new Bateau("Torpilleur", 2, 2);

            pdvJoueur = bateaux[0].PointsVie + bateaux[1].PointsVie + bateaux[2].PointsVie + bateaux[3].PointsVie + bateaux[4].PointsVie;
            pdvEnnemi = bateaux[0].PointsVie + bateaux[1].PointsVie + bateaux[2].PointsVie + bateaux[3].PointsVie + bateaux[4].PointsVie;
            return bateaux;
        }

        // Affichage de l'en-tete de jeu
        static void EnTetePrincipale()
        {
            Console.WriteLine("      * * * * * * * * * * * * * * * * * * * *");
            Console.WriteLine("      *     Battaille Navale Console Pro    *");
            Console.WriteLine("      *             Studio AMJ              *");
            Console.WriteLine("      * * * * * * * * * * * * * * * * * * * *");
        }

        // Affichage du menu principale et des reglements
        static void MenuPrincipale()
        {
            // Message de bienvenue
            Console.WriteLine();
            Console.WriteLine("------------------------------------------------------");
            Console.WriteLine("Bienvenue sur notre jeu BattleShip Console.");
            Console.WriteLine("Créé par Maxime Couture, Jacob Gagnon et Alex Boutin!");
            Console.WriteLine("------------------------------------------------------");

            // Enumerations des règles du jeu.           
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.WriteLine("Règles du jeu:");
            Console.WriteLine();
                
            Console.WriteLine("Deux joueurs placent secrètement leurs bateaux sur leur grille de jeu.");
            Console.WriteLine();
            Console.WriteLine("Le but du jeu est d'être le premier à localiser et couler la flotte entière de bateaux de l'adversaires.");
            Console.WriteLine();
            Console.WriteLine("Chaque joueur tir à tour de rôle en entrant des coordonnées. Exemple: A4, D9, F3, etc.");
            Console.WriteLine();
            Console.WriteLine("Un tir peut Toucher, Manquer ou même Couler un bateau ennemi.");
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("------------------------------------------------------");
            Console.WriteLine("Appuyez sur une touche pour débuter la partie.");
            Console.ReadKey();
            Console.Clear();
        }     
    }
}
