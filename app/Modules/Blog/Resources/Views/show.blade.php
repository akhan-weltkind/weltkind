@extends('layouts.blog')


@section('content')
@hasSection('h1')
    <h1 class="page-title">@yield('h1')</h1>
@elseif(isset($meta->h1) && $meta->h1)
    <h1 class="page-title">{{$meta->h1}}</h1>
@endif
<article class="blog-full">
    <header class="blog-full__header">
        <div class="info-small">
            <time class="info-small__time" datetime="{{Date::_('Y-m-d', $entity->date)}}">{{Date::_('d.m.Y', $entity->date)}}</time>
            <span class="info-small__separator">&mdash;</span>
            <a class="info-small__author" href="#">{{$entity->user->name}}</a>
        </div>
    </header>
    <div class="blog-full__content">
        {!! $entity->content !!}
    </div>
    <footer>
        <p>
            <a href="{!! route('blog') !!}">&larr; Назад</a>
        </p>
    </footer>
</article>
@endsection
