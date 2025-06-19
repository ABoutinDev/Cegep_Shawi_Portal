### // SYNCING //

Sur Github.com Dans les parametres du "Repository@Repo". Ajoutes les collaborateurs avec leur email de compte sur GitHub.

1. git clone url.com / Télécharge un projet et tout son historique de versions

Apres avoir cloner le reportoire et s'etre synchroniser. Premiere chose a faire quand on veut commencer a travailler de notre bord. On doit tout d'abord allez chercher les changements qui peut y avoir d'ajouter sur le cloud.

1. git checkout main / Je me connecte a la "branch" mere du projet
2. git fetch / Récupère tout l'historique du dépôt
3. git pull / Ensuite, je veux "pull" le travaux effectuer par les autres qui est sur l'environement cloud
4. git checkout alex /
5. git merge main /

### // BRANCHING //

Si tu veux travailler sur une "branch" unique a toi pour eviter la corruption de fichier et autres complications.

1. git branch -b branchname / Commande pour cree une branch
2. git branch -d branchname / Commande pour delete une branch
3. git push origin --delete branchname / Commande pour delete la branch sur le git aussi

4. git merge branchname / Commande qui combine la branche courante avec l'historique de la branche specifier
5. git push origin main / Publie ton travail local sur la branch main

### // Modifications //

Tu as effectuer quelques modifications et tu dois maintenant les envoyers les ajouts sur ton "repository" de groupe.

1. git add --all / Ajoute toutes les modifications
1. git add nomExactFichier.X / Ajoute les modifications d'un fichier precis. (X doit etre l'extensions exact du ficher)
1. git commit -m "commentaire" / Effectue un "state change"
1. git push origin branchname / Publie les ajouts sur ton environement cloud.

Par la suite, on veut publier sur la "main" branch du repository. 4. git checkout main / 5. git merge branchname / 6. git push origin main /

### // Liste de commande Git //

https://training.github.com/downloads/fr/github-git-cheat-sheet.pdf
