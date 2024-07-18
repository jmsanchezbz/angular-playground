# PEC 3
Angular Material

## Ejercicio 1 forms
ok

## Ejercicio 2 tables
ok

## Ejercicio 3 Spinner
- En primer lugar se pensava crear un subject en el sericio compartido con un metodo que modificara el loading desde los effects de que cambian el estado pero eso implicaba llamar a ese método desde muchos sitios y bastante código.
- Finalmente se opta por subscribirse a las propiedades loading de los diferentes DTO del store para ver los cambios de la propiedad loading y mostar u ocultar el spinner. Este cambio solo afecta al componente principal.

Se crea un componente spinner como indica el ejercicio y se pone en el componente app.component.html. Este componente tiene un parámetro loading para mostrar o ocular el spinner.

    <app-spinner [loading]="isLoading"></app-spinner>

En el componente app.component.ts se crea un método para comprobar si algunos de las subscripciones es cierta y actualiza la propiedad isLoading que se le pasa al spinner.

    private checkLoading() {
      this.isLoading =
        this.authLoading ||
        this.userLoading ||
        this.postsLoading ||
        this.categoriesLoading;
    }
ok

## Ejercicio 4
Menu con toolbar hamburgesa con breakpoint a 1024px, si la pantalla es mayor se muestra también el menu horizontal superior.
ok

## Ejercicio 5
Componente Card con flexbox, ancho 100% cuando pantalla es menor de 1024px y mayores en grupo de 3 cards por fila
ok

## Ejercicio 6
Se utiliza Angular Charts y se pone un gráfico de barras y otro tipo donut para mostrar el número de likes y dislikes.
ok

## Ejercicio 7
Se realizó conjuntamente con el ejercicio 5 teniendo un @input tipo post y un @output que indica si se hay que actualizar los cards al haber clicado en like o dislike.
ok