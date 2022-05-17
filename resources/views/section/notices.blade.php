<div class="col-md-6">
            
    <div class="row">
        <h4 class="text-center">Noticias</h4>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">TITULO</th>
                <th scope="col">ACCIÓN</th>
            </tr>
        </thead>
        <tbody>
            @foreach( $notices as $notice )
                <tr>
                    <td>{{ $notice->name }}</th>
                    <td>
                        <a><button class="btn btn-primary">Ver más</button></a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>