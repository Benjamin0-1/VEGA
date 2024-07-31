export function promedio(rating){ 

 
    let i = 0
    let summ = 0;
    while (i < rating.length) {
      summ = summ + rating[i++];
    }
    return Math.round(summ / rating.length);
  }