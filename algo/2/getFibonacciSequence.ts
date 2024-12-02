/*
Créé une fonction getFibonacciSequence qui prend un nombre n en paramètre et retourne un tableau contenant les n premiers nombres de la suite de Fibonacci.

Détails

* La suite de Fibonacci commence par les nombres 0 et 1.
* Chaque nombre suivant est la somme des deux nombres précédents.
* Par exemple, pour n = 5, la fonction devrait retourner [0, 1, 1, 2, 3].

Si n est inférieur ou égal à 0, la fonction doit retourner un tableau vide []
*/

function getFibonacciSequence(size: number): number[] {
  const result: number[] = [];

  if (size <= 0) {
    return result;
  }

  result.push(0);

  if (size > 1) {
    result.push(1);
  }

  for (let i = 2; i < size; i++) {
    const nextNumber = result[i - 1] + result[i - 2];
    result.push(nextNumber);
  }
  return result;
}

export default getFibonacciSequence;
