# aik-portal-frontend

## Diseño de pruebas unitarias

### Caso de prueba # 1
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/” |
| Objetivo de la prueba | Probar que el método muestra la página principal del portal AIK. |
| Entradas | Evento ->  OnClickButton |
| Salidas | { </br> status: 200,</br>body: index</br>} |

### Caso de prueba # 2
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/buycars”  |
| Objetivo de la prueba | Probar que el método redirecciona al contenido de la sección de comprar vehículos, siempre que el backend esté activo. |
| Entradas | Evento ->  OnClickButton |
| Salidas | {</br>status: 200</br>vehicles :[</br>dataN:{</br>title: string,</br>releaseYear: string,</br>score: int</br>price: double</br>description: string</br>avatar: string</br>}</br>]</br>} |

### Caso de prueba # 3
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/buycars” |
| Objetivo de la prueba | Probar que el método no redirecciona al contenido de la sección de comprar vehículos, cuando no se puede establecer comunicación con el backend. |
| Entradas | Evento ->   OnClickButton |
| Salidas | {</br>status: 400</br>} |

### Caso de prueba # 4
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/vehicles” |
| Objetivo de la prueba | Probar que el método redirecciona al contenido de la sección de vehículos, siempre que el backend esté activo. |
| Entradas | Evento ->  OnClickButton |
| Salidas |{</br>status: 200,</br>vehicles :[</br>dataN:{</br>title: string,</br>releaseYear: string,</br>score: int</br>price: double</br>description: string</br>avatar: string</br>}</br>]</br>}</br> |

### Caso de prueba # 5
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/vehicles” |
| Objetivo de la prueba | Probar que el método no redirecciona al contenido de la sección de vehículos, cuando no se puede establecer comunicación con el backend. |
| Entradas | Evento ->  OnClickButton |
| Salidas | {</br>status: 400</br>} |

### Caso de prueba # 6
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/support” |
| Objetivo de la prueba | Probar que el método redirecciona al contenido de la sección de soporte, siempre que el backend esté activo. |
| Entradas | Evento ->  OnClickButton |
| Salidas | {</br>status: 200,</br>support : [</br>1: {</br>name: string,</br>avatar: string</br>},</br>N: {</br>name: string,</br>avatar: string</br>}</br>]</br>}</br> |

### Caso de prueba # 7
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/support” |
| Objetivo de la prueba | Probar que el método no redirecciona al contenido de la sección de soporte, cuando no se puede establecer comunicación con el backend. |
| Entradas | Evento ->  OnClickButton |
| Salidas | {</br>status: 400</br>} |

### Caso de prueba # 8
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/experience |
| Objetivo de la prueba | Probar que el método redirecciona al contenido de la sección de experiencia, siempre que el backend esté activo. |
| Entradas | Evento ->  OnClickButton |
| Salidas | {</br>experience:[</br>dataN:{</br>nombre: string</br>imagen: string</br>enlace: string</br>}</br>]</br>} |

### Caso de prueba # 9
| Nombre | Descripción |
| - | - |
| Componente gráfico o método | GET “/experience |
| Objetivo de la prueba | Probar que el método no redirecciona al contenido de la sección de experiencia, cuando no se puede establecer comunicación con el backend. |
| Entradas | Evento ->  OnClickButton |
| Salidas | {</br>status: 400</br>} |
