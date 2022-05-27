# Security_Module
Online store from which you can order products. Implemented a security module to set roles and verify each role button.

Magazinele online sunt din ce in ce mai multe, in primul rand pentru ca sunt la mare cautare de catre consumatori, dar si pentru ca ofera independenta unei afaceri fata de alte persoane si situatii neprevazute.
Un magazine online perofesional este necesar unui business si este tratat mai serios de client decat un simplu website. Avantajele unui magazin online profesional sunt urmatoarele:
•Simplitate – totul trebuie sa fie usor de utilizat, iar un magazin online simplu este accesibil tuturor, chiar si clientilor mai putin priceputi in utilizarea internetului;
•Functionalitate – este foarte important ca toate paginile magazinului online sa fie functionale si sa comunice clar unui potential client ce se asteapta de la acesta;
•Compatibilitate – magazinul online trebuie sa fie compatibil cu toate browserele de cautare;
•Interactivitate – interactivitatea aduce un plus magazinului online, iar un magazine online profesional pune intotdeauna accent pe interactiunea cu vizitatorii;
•Administrare – magazinul online trebuie sa fie usor de administrat, sa ii permita o managerizare facila, rapida si eficienta;
•Continut – clientii si potentialii clienti doresc intotdeauna sa vada un continut de calitate si detalii cu privire la produsele prezentate. Un continut de calitate va atrage intotdeauna clienti;
•Client Service – un magazin online profesional va urmari intotdeauna dorintele si asteptarile clientilor si va pune accent pe atitudinea fata de client si potentiali clienti;
•Promovare – un magazin online profesional este prezent pe social media, creeaza o comunitate in jurul brand-ului si beneficiaza de promovarea atat online, cat si offline.

Echipa noastra a dezvoltat un magazine online, pentru care am creat si un modul de securitate. Obiectivul de baza al acestui sistem este plasarea unei comenzi rapide, usor de realizat si sigura din punct de vedere cibernetic. Sistemul cripteaza datele la inregistrare si le decripteaza la logare. Acest lucru este cel mai sigur de utilizat deoarece parolele nu pot fi descifrate foarte usor. 
Securitatea este intarita de functia de modulul de securitate in care fiecare  utilizator va primi un rol specific iar acesta va putea avea permisiuni doar la anumite pagini, depinzand de fiecare rol. 
Fiecare utilizator are unul dintre rolurile:
•	Client
•	Contabil
•	Operator Comenzi
•	Administrator
Clientul are access doar la paginile de baza si anume: Homepage, Products, About, Cart, MyAccount, Login, Register. El poate folosi toate functionalitatile acestor pagini.
Contabilul are access la aceleasi pagini ca si clientul, iar pe langa acestea si la pagina Accountant de unde poate gestiona produsele (vizualizare,adaugare).
Operatorul are access la aceleasi pagini ca si clientul, insa poate accesa in plus pagina Orders de unde poate vedea comezile in real-time dar si cateva date despre cumparator.
Administratorul are access la toate paginile , unde pe langa cele amintitedeja exista si pagina Users Permission de unde administratorul poate schimba rolurile oricarui utilizator astfel oferindu-i acces la anumite pagini in functie de rol.
