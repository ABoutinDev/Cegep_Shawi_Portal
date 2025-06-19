using System;
using Jeu_Battleship;

namespace Jeu_Battleship
{
    public struct Bateau
    {
        public string Nom { get; set; }
        public int Taille { get; set; }
        public int PointsVie { get; set; }

        public Bateau(string nom, int taille, int pointsDeVie)
        {
            Nom = nom;
            Taille = taille;
            PointsVie = pointsDeVie; 
        }
    }
}
