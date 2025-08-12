# Images des Projets

Pour ajouter les images de vos projets :

1. Ajoutez vos captures d'écran dans ce dossier `/public/images/`
2. Nommez-les de manière descriptive (ex: `project-client-site.jpg`)
3. Modifiez les chemins dans `/src/components/Projects.astro`

## Format recommandé :
- Format : JPG ou PNG
- Taille : 1200x630px (ratio 16:9) pour un affichage optimal
- Qualité : Optimisée pour le web (< 500KB)

## Images nécessaires :
- `project-client-site.jpg` : Capture d'écran du site de votre cliente
- `coming-soon.jpg` : Image placeholder pour les futurs projets (optionnel)

## Modification du code :
Dans `/src/components/Projects.astro`, décommentez la section `<img>` et commentez le placeholder actuel.
